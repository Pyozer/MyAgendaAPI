import { config as dotEnvConfig } from "dotenv"
import express, { Application, Response, NextFunction, Request } from "express"
import memjs from 'memjs'
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()

const app: Application = express()

const { PORT = 3000, MEMCACHIER_SERVERS } = process.env
let client = memjs.Client.create(MEMCACHIER_SERVERS, {
    expires: 30
})

applyMiddlewares(middlewares, app)

app.use((req: Request, res: Response, next: NextFunction) => {
    const { url: key } = req
    client.get(key, (err, result) => {
        if (err == null && result != null) {
            res.send(result.toString())
        } else {
            let oldSend = res.send;
            res.send = function (body?: any): Response {
                client.set(key, `${body}`, {})
                return oldSend.apply(res, arguments);
            }
            next()
        }
    })
})

app.use("/api", baseRoute)
app.use("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
