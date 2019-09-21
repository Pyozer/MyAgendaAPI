import { Request, Response } from "express"
import { readAndParseFile } from "../../utils"
import icalFromUrl from "./ical"

const parseIcal = async (req: Request, res: Response) => {
    const { univId, resId } = req.params
    const { firstDate, lastDate } = req.query

    if (!univId || !resId || !firstDate || !lastDate) {
        res.status(400).send({ error: "You must provide univId, resId, firstDate and lastDate to get events." })
        return
    }

    try {
        const data: any[] = await readAndParseFile(`./data/agendas/resources.json`)
        const univData = data.find((univ: any) => univ.id === univId)

        if (!univData) {
            res.status(400).send({ error: `University id provided is not correct !` })
            return
        }

        const univUrl = univData.agendaUrl
            .replace("%res%", resId)
            .replace("%firstDate%", firstDate)
            .replace("%lastDate%", lastDate)

        icalFromUrl(univUrl, (error: any, vevents: []) => {
            if (error) {
                res.status(400).send({ error })
                return
            }
            res.send({ data: { vevents } })
        })
    } catch (error) {
        res.status(400).send({ error: `Resources file not found` })
    }
}

export default parseIcal
