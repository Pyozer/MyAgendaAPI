import { Request, Response } from "express"
import moment from "moment-timezone"
import { v4 as uuidv4 } from "uuid"
import { getLangMsg } from "../../utils/messages"
import { icalFromUrl } from "./ical"

export const parseCustomIcal = async (req: Request, res: Response) => {
    const isIOS = req.headers["user-agent"].includes("Dart/2.6");

    let url: string = `${req.query.url}`

    if (!url || url.trim().length === 0) {
        res.status(400).send({ error: getLangMsg(req, "missing_ical_url") })
        return
    }

    url = url.replace("webcal://", "https://")

    try {
        const vevents = await icalFromUrl(url)

        if (!isIOS) {
            for (let i = 0; i < 15; i++) {
                const dtstart = moment.tz("Europe/Paris").startOf("day").add(i, "days")
                const dtend = dtstart.clone().add(1, "hour")

                vevents.push({
                    dtstart: dtstart.toDate(),
                    dtend: dtend.toDate(),
                    created: new Date("2024-08-22T00:00:00Z"),
                    dtstamp: new Date("2024-08-22T00:00:00Z"),
                    summary: isIOS ? "FIN PROBABLE DE L'APP LE 01/09. VOIR SECTION AIDE POUR + D'INFOS" : "Nouvelle mise à jour disponible !",
                    lastmodified: new Date(),
                    description: isIOS ? "Voir la section aide pour plus d'infos et solutions alternatives" : "Allez sur le Play Store pour mettre à jour l'application",
                    location: "",
                    uid: uuidv4()
                })
            }
        }

        res.status(200).send({ data: { vevents } })
    } catch (errorKey) {
        res.status(500).send({ error: getLangMsg(req, errorKey) })
    }
}
