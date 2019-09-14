import { Request, Response } from "express"
import { readFile } from "fs"

const resources = (req: Request, res: Response) => {
    readFile('./data/agendas/resources.json', 'utf8', (err, data: string) => {
        if (err) {
            res.status(400).send({ error: `Filename provided is unknown` })
        } else {
            res.send({ data: JSON.parse(data) })
        }
    })
}

const universityResources = (req: Request, res: Response) => {
    const { univFile } = req.params
    if (!univFile) {
        res.status(400).send({ error: "You must provide the university resource file name !" })
        return
    }
    readFile(`./data/agendas/${univFile}.json`, 'utf8', (err, data: string) => {
        if (err) {
            res.status(400).send({ error: `University filename provided not found` })
        } else {
            res.send({ data: JSON.parse(data) })
        }
    })
}

export { resources, universityResources }
