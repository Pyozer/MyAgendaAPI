import { Request, Response } from "express"

export const welcome = (req: Request, res: Response) => {
    res.type(".html").send("<h1>Welcome on MyAgenda API !</h1>")
}
