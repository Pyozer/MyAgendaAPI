import { Request, Response } from "express"

export const welcome = (_: Request, res: Response) => {
    res.type(".html").send("<h1>Welcome on MyAgenda API !</h1>")
}
