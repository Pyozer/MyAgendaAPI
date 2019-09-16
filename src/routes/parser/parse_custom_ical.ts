import { Request, Response } from "express"
import icalFromUrl from "./ical"

const parseCustomIcal = (req: Request, res: Response) => {
    const { url } = req.query

    if (!url) {
        res.status(400).send({ error: "You must provide univId, resId, firstDate and lastDate to get events." })
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
