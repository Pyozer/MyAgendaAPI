import { Request, Response } from "express"
import { getLangMsg } from "../../utils/messages"
import icalFromUrl from "./ical"

const parseCustomIcal = (req: Request, res: Response) => {
    const { url } = req.query

    if (!url) {
        res.status(400).send({ error: getLangMsg(req, "missing_ical_url") })
        return
    }

    icalFromUrl(url, (error: any, vevents: []) => {
        if (error) {
            res.status(400).send({ error })
            return
        }
        res.send({ data: { vevents } })
    })
}

export default parseCustomIcal
