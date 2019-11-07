import { Request, Response } from "express"
import { readAndParseFile, readFile } from "../../utils"
import { getLangMsg } from "../../utils/messages"

const helps = async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"]

    try {
        const helpPages: any[] = await readAndParseFile(req, "./data/help/help_list.json")
        helpPages.forEach((help) => {
            if (help.title[lang]) {
                help.title = help.title[lang]
            } else {
                help.title = help.title.en
            }
        })
        res.status(200).send({ data: helpPages })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const helpFile = async (req: Request, res: Response) => {
    if (!req.params.filename) {
        res.status(400).send({ error: getLangMsg(req, "unknown_help_file") })
        return
    }

    const lang = req.headers["accept-language"]
    try {
        const data = await readFile(req, `./data/help/${req.params.filename}_${lang}.md`)
        res.status(200).send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

export { helps, helpFile }
