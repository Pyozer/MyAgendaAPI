import { Request, Response } from "express"
import { getLangMsg } from "../../utils/messages"
import icalFromUrl from "./ical"

const parseCustomIcal = async (req: Request, res: Response) => {
    const { url } = req.query

    if (!url) {
        res.status(400).send({ error: getLangMsg(req, "missing_ical_url") })
        return
    }

    try {
        const vevents = await icalFromUrl(url)
        res.send({ data: { vevents } })
    } catch (errorKey) {
        res.status(500).send({ error: getLangMsg(req, errorKey) })
    }
}

export default parseCustomIcal
