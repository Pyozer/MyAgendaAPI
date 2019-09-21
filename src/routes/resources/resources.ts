import { Request, Response } from "express"
import { readFile } from "fs-extra"
import { readAndParseFile } from "../../utils"

const resources = async (_: Request, res: Response) => {
    try {
        const data = await readAndParseFile("./data/agendas/resources.json")
        res.send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const universityResources = async (req: Request, res: Response) => {
    const { univId } = req.params
    if (!univId) {
        res.status(400).send({ error: "You must provide the university resource file name !" })
        return
    }
    try {
        const data = await readAndParseFile(`./data/agendas/resources_${univId}.json`)
        res.send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

export { resources, universityResources }
