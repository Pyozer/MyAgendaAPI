import { Router } from "express"
import { readFile as readFileFs } from "fs-extra"

type Wrapper = ((router: Router) => void)

export const applyMiddlewares = (middlewares: Wrapper[], router: Router) => {
    for (const middleware of middlewares) {
        middleware(router)
    }
}

export const readFile = async (filePath: string): Promise<string> => {
    try {
        return await readFileFs(filePath, "utf8")
    } catch (_) {
        throw new Error(`Cannot find and read file: ${filePath}`)
    }
}

export const readAndParseFile = async (filePath: string) => {
    const data = await readFile(filePath)
    try {
        return JSON.parse(data)
    } catch (_) {
        throw new Error(`Error when trying to parse data from file ${filePath}`)
    }
}
