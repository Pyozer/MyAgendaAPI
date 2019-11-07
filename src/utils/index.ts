import { Request, Router } from "express"
import { readFile as readFileFs } from "fs-extra"
import { getLangMsg } from "./messages"

type Wrapper = ((router: Router) => void)

export const applyMiddlewares = (middlewares: Wrapper[], router: Router) => {
    for (const middleware of middlewares) {
        middleware(router)
    }
}

export const readFile = async (req: Request, filePath: string): Promise<string> => {
    try {
        return await readFileFs(filePath, "utf8")
    } catch (e) {
        console.error(e)
        throw getLangMsg(req, "error_read_file", { file: filePath })
    }
}

export const readAndParseFile = async (req: Request, filePath: string) => {
    const data = await readFile(req, filePath)
    try {
        return JSON.parse(data)
    } catch (e) {
        console.error(e)
        throw getLangMsg(req, "error_parse_file", { file: filePath })
    }
}
