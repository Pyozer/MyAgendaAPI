import { config as dotEnvConfig } from "dotenv"
import express, { Application, Response, NextFunction, Request } from "express"
import redis from 'redis';
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()

const app: Application = express()

const { PORT = 3000, REDIS_URL } = process.env
let client = redis.createClient(REDIS_URL)

applyMiddlewares(middlewares, app)

app.use((req: Request, res: Response, next: NextFunction) => {
    const { url: key } = req
    client.get(key, (err, result) => {
        if (err == null && result != null) {
            res.contentType('application/json').send(result)
        } else {
            let oldSend = res.send;
            res.send = function (body?: any): Response {
                client.set(key, `${body}`)
                client.expire(key, 60)
                return oldSend.apply(res, arguments);
            }
            next()
        }
    })
})

app.use("/api", baseRoute)
app.use("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
