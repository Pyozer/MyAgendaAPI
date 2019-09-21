import { config as dotEnvConfig } from "dotenv"
import express, { Application } from "express"
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()

const app: Application = express()

applyMiddlewares(middlewares, app)

app.use("/api", baseRoute)
app.use("/", welcome)

const { PORT = 3000 } = process.env
app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
