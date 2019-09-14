import { Request, Response } from "express"
const ical: any = require("node-ical")

const parseIcal = (req: Request, res: Response) => {
    const { url } = req.query
    if (!url) {
        res.status(400).send({ error: "You must provide the url parameter, for the ical file." })
        return
    }

    ical.fromURL(url, {}, (error: any, icalData: any) => {
        if (error) {
            res.status(400).send({ error })
            return
        }
        const vevents = []
        for (const key in icalData) {
            if (icalData.hasOwnProperty(key)) {
                const ev = icalData[key]
                if (icalData[key].type === "VEVENT") {
                    vevents.push({
                        uid: key,
                        dtstart: ev.start,
                        dtend: ev.end,
                        description: ev.description,
                        location: ev.location,
                        summary: ev.summary,
                        dtstamp: ev.dtstamp,
                        created: ev.created,
                        lastmodified: ev.lastmodified,
                    })
                }
            }
        }
        res.send({ data: { vevents } })
    })
}

export default parseIcal
