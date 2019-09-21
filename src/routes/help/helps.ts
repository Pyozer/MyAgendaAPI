import { Request, Response } from "express"
import { readAndParseFile, readFile } from "../../utils"

const helps = async (req: Request, res: Response) => {
    const lang = req.headers["accept-language"]

    try {
        const helpPages: any[] = await readAndParseFile(`./data/help/help_list.json`)
        helpPages.forEach((help) => {
            if (help.title[lang]) {
                help.title = help.title[lang]
            } else {
                help.title = help.title.en
            }
        })
        res.send({ data: helpPages })
    } catch (error) {
        res.status(400).send({ error })
    }
}

const helpFile = async (req: Request, res: Response) => {
    if (!req.params.filename) {
        res.status(400).send({ error: "You must provide the filename to get help data" })
        return
    }

    const lang = req.headers["accept-language"]
    try {
        const data = await readFile(`./data/help/${req.params.filename}_${lang}.md`)
        res.send({ data })
    } catch (error) {
        res.status(400).send({ error })
    }
}

export { helps, helpFile }
