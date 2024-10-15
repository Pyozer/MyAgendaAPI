import { Request, Response } from "express"
import moment from "moment-timezone"
import { v4 as uuidv4 } from "uuid"
import { getLangMsg } from "../../utils/messages"
import { icalFromUrl } from "./ical"

export const parseCustomIcal = async (req: Request, res: Response) => {
    const isIOS = req.headers["user-agent"].includes("Dart/2.6")

    let url: string = `${req.query.url}`

    if (!url || url.trim().length === 0) {
        res.status(400).send({ error: getLangMsg(req, "missing_ical_url") })
        return
    }

    url = url.replace("webcal://", "https://")

    try {
        const vevents = await icalFromUrl(url)

        for (let i = 0; i < 15; i++) {
            const dtstart = moment.tz("Europe/Paris").startOf("day").add(i, "days").hour(12)
            const dtend = dtstart.clone().add(1, "hour")

            vevents.push({
                dtstart: dtstart.toDate(),
                dtend: dtend.toDate(),
                created: new Date("2024-08-22T00:00:00Z"),
                dtstamp: new Date("2024-08-22T00:00:00Z"),
                summary: "Mise à jour de l'application disponible !",
                lastmodified: new Date(),
                description: "Cette version cessera de fonctionner fin octobre !",
                location: isIOS ? "App Store" : "Play Store",
                uid: uuidv4()
            })
        }

        res.status(200).send({ data: { vevents } })
    } catch (errorKey) {
        res.status(500).send({ error: getLangMsg(req, errorKey) })
    }
}
