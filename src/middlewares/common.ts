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
