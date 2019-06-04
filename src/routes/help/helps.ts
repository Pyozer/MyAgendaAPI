import { Request, Response } from "express";
import { readFile } from "fs";
import helpList from "../../../data/help/help_list.json";

function helps(req: Request, res: Response) {
    if (!helpList) {
        res.status(500).send({ error: "Impossible to get help data, try later." });
        return;
    }
    res.send({ data: helpList });
}

function helpFile(req: Request, res: Response) {
    if (!req.params.filename) {
        res.status(400).send({ error: "You must provide the filename to get help data" });
        return;
    }

    const lang = req.headers["accept-language"];
    readFile(`./data/help/${req.params.filename}_${lang}.md`, "utf8", (err, data) => {
        if (err) {
            res.status(400).send({ error: `Filename provided is unknown, or not supported in ${lang}` });
        }
        else {
            res.contentType("text/markdown").send(data);
        }
    });
}

export { helps, helpFile };
