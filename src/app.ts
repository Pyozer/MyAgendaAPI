import { config as dotEnvConfig } from "dotenv"
import express, { Application, NextFunction, Request, Response } from "express"
import redis from "redis"
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()

const app: Application = express()

const { PORT = 3000, REDIS_URL } = process.env
const client = redis.createClient(REDIS_URL)

applyMiddlewares(middlewares, app)

app.use((req: Request, res: Response, next: NextFunction) => {
    const { url: key } = req
    client.get(key, (err, result) => {
        if (err == null && result != null) {
            res.type("json").send(result)
        } else {
            const oldSend = res.send
            res.send = function(body?: any): Response { // tslint:disable-line only-arrow-functions
                if (res.statusCode === 200) {
                    client.set(key, `${body}`)
                    if (key.startsWith("/api/resources") || key.startsWith("/api/helps")) {
                        // 24 hours cache
                        client.expire(key, 86400)
                    } else {
                        // 5 minutes cache
                        client.expire(key, 300)
                    }
                }

                return oldSend.apply(res, arguments)
            }
            next()
        }
    })
})

app.use("/api", baseRoute)
app.use("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
