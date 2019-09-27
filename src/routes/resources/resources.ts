import { Request, Response } from "express"
import { readAndParseFile } from "../../utils"
import { getLangMsg } from "../../utils/messages"

const resources = async (req: Request, res: Response) => {
    try {
        const data = await readAndParseFile(req, "./data/agendas/resources.json")
        res.send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const universityResources = async (req: Request, res: Response) => {
    const { univId } = req.params
    if (!univId) {
        res.status(400).send({ error: getLangMsg(req, "missing_university_filename") })
        return
    }
    try {
        const data = await readAndParseFile(req, `./data/agendas/resources_${univId}.json`)
        res.send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

export { resources, universityResources }
