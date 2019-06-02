import { Request, Response } from "express";
import helpList from "../../../data/help/help_list.json";

function helps(req: Request, res: Response) {
    const lang: string = req.headers["accept-language"];
    if (!lang) {
        res.status(400).send({ error: "You must provide the language in Accept-Language header" });
        return;
    }

    if (!helpList) {
        res.status(500).send({ error: "Impossible to get help data, try later." });
        return;
    }

    res.send(helpList);
}

export default helps;
