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
    if (!req.headers["accept-language"]) {
      res.status(400).send({ error: "You must provide the language in Accept-Language header" })
    } else {
      const lang = req.headers["accept-language"].split(",")[0].split("_")[0].split("-")[0]
      const supportedLanguages = ["en", "fr"]
      if (supportedLanguages.includes(lang)) {
        req.headers["accept-language"] = lang
      } else {
        req.headers["accept-language"] = "en"
      }
      next()
    }
  })
}

export const handleMorgan = (router: Router) => {
  router.use(morgan("[:date] :method :url :status :res[content-length] - :response-time ms"))
}
