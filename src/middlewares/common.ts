import parser from "body-parser"
import compression from "compression"
import { NextFunction, Request, Response, Router } from "express"
import morgan from "morgan"

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }))
  router.use(parser.json())
}

export const handleCompression = (router: Router) => {
  router.use(compression())
}

export const handleAcceptLanguage = (router: Router) => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    const defaultLang = "en"
    if (!req.headers["accept-language"]) {
      req.headers["accept-language"] = defaultLang
    }

    const lang = req.headers["accept-language"].split(",")[0].split("_")[0].split("-")[0]
    const supportedLanguages = ["en", "fr"]

    if (supportedLanguages.includes(lang)) {
      req.headers["accept-language"] = lang.toLowerCase()
    } else {
      req.headers["accept-language"] = defaultLang
    }
    next()
  })
}

export const handleMorgan = (router: Router) => {
  router.use(morgan("[:date] :method :url :status :res[content-length] - :response-time ms"))
}
