import dotevent from "dotenv"
import express, { Application } from "express"
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

const app: Application = express()

dotevent.config()
applyMiddlewares(middlewares, app)

app.use("/", welcome)
app.use("/api", baseRoute)

const { PORT = 3000 } = process.env
app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
