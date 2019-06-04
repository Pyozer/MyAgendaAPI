import parser from "body-parser";
import compression from "compression";
import { Application } from "express";

export const handleBodyRequestParsing = (app: Application) => {
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
};

export const handleCompression = (app: Application) => {
  app.use(compression());
};

export const handleAcceptLanguage = (app: Application) => {
  app.use((req, res, next) => {
    if (!req.headers["accept-language"]) {
      res.status(400).send({ error: "You must provide the language in Accept-Language header" });
    } else {
      req.headers["accept-language"] = req.headers["accept-language"].split(",")[0].split("_")[0].split("-")[0];
      next();
    }
  });
};
