import * as Sentry from "@sentry/node"
import { config as dotEnvConfig } from "dotenv"
import express, { Application } from "express"
import middlewares from "./middlewares"
import { apiRouter } from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()
const { PORT = 3000, SENTRY_DSN } = process.env

const app: Application = express()

Sentry.init({ dsn: SENTRY_DSN })
app.use(Sentry.Handlers.requestHandler())

applyMiddlewares(middlewares, app)

app.use("/api", apiRouter)
app.get("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
