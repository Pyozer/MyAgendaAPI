import { Request, Response } from "express"
import { readAndParseFile, readFile } from "../../utils"
import { getLangMsg } from "../../utils/messages"

interface IHelpRaw {
    title: {
        [key: string]: string
    },
    filename: string
}
interface IHelpLocal {
    title: string,
    filename: string
}

export const helps = async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"]

    try {
        const helpPages: IHelpRaw[] = await readAndParseFile(req, "./data/help/help_list.json")
        const helpPagesLocal = helpPages.map<IHelpLocal>((help) => {
            return {
                title: help.title[lang] || help.title.en,
                filename: help.filename
            }
        })
        res.status(200).send({ data: helpPagesLocal })
    } catch (error) {
        res.status(400).send({ error })
    }
}

export const helpFile = async (req: Request, res: Response) => {
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
