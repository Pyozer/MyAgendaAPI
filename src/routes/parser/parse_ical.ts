import { Request, Response } from "express"
import { readFile } from "fs"
import icalFromUrl from "./ical"

const parseIcal = (req: Request, res: Response) => {
    const { univId, resId } = req.params
    const { firstDate, lastDate } = req.query

    if (!univId || !resId || !firstDate || !lastDate) {
        res.status(400).send({ error: "You must provide univId, resId, firstDate and lastDate to get events." })
        return
    }

    readFile(`./data/agendas/resources.json`, 'utf8', (err, data: string) => {
        if (err) {
            res.status(400).send({ error: `Resources file not found` })
        } else {
            let univData = JSON.parse(data).find((univ: any) => univ.id == univId);

            if (!univData) {
                res.status(400).send({ error: `University id provided is not correct !` })
                return
            }

            let univUrl = univData.agendaUrl
                .replace('%res%', resId)
                .replace('%firstDate%', firstDate)
                .replace('%lastDate%', lastDate)

            icalFromUrl(univUrl, (error: any, vevents: []) => {
                if (error) {
                    res.status(400).send({ error })
                    return
                }
                res.send({ data: { vevents } })
            })
        }
    })
}

export default parseIcal
