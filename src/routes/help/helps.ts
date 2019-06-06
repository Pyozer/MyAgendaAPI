import { Request, Response } from "express"
import { readFile } from "fs"

const helps = (req: Request, res: Response) => {
    const lang = req.headers["accept-language"]
    readFile(`./data/help/help_list.json`, "utf8", (err, data: string) => {
        if (err) {
            res.status(400).send({ error: `Filename provided is unknown` })
        } else {
            const helpPages: any[] = JSON.parse(data)
            helpPages.forEach((help) => {
                if (help.title[lang]) {
                    help.title = help.title[lang]
                } else {
                    help.title = help.title.en
                }
            })
            res.send({ data: helpPages })
        }
    })
}

const helpFile = (req: Request, res: Response) => {
    if (!req.params.filename) {
        res.status(400).send({ error: "You must provide the filename to get help data" })
        return
    }

    const lang = req.headers["accept-language"]
    readFile(`./data/help/${req.params.filename}_${lang}.md`, "utf8", (err, data: string) => {
        if (err) {
            res.status(400).send({ error: `Filename provided is unknown, or not supported in ${lang}` })
        } else {
            res.send({ data })
        }
    })
}

export { helps, helpFile }
