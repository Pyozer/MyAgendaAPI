import { Request, Response } from "express"
import { getLangMsg } from "../../utils/messages"
import { icalFromUrl } from "./ical"

export const parseCustomIcal = async (req: Request, res: Response) => {
    let url: string = `${req.query.url}`

    if (!url || url.trim().length === 0) {
        res.status(400).send({ error: getLangMsg(req, "missing_ical_url") })
        return
    }

    url = url.replace("webcal://", "https://")
    if (!url.startsWith("https://") || !url.startsWith("http://")) {
        url = `https://${url}`
    }

    try {
        const vevents = await icalFromUrl(url)
        res.status(200).send({ data: { vevents } })
    } catch (errorKey) {
        res.status(500).send({ error: getLangMsg(req, errorKey) })
    }
}
