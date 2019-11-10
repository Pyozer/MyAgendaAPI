import { config as dotEnvConfig } from "dotenv"
import express, { Application, NextFunction, Request, Response } from "express"
import redis from "redis"
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()

const app: Application = express()

const { PORT = 3000, REDIS_URL, ENVIRONMENT = "dev" } = process.env
const client = redis.createClient(REDIS_URL)

applyMiddlewares(middlewares, app)

app.use((req: Request, res: Response, next: NextFunction) => {
    const { url: key } = req

    const maxExpire = ENVIRONMENT === "dev" ? 0 : 86400 // Maximum cache duration (24 hours)

    let validExpire = 300 // 5 minutes of cache
    if (key.startsWith("/api/resources") || key.startsWith("/api/helps")) {
        validExpire = 86400 // 24 hours cache
    }

    client.ttl(key, (_, remaining) => {
        const timeElapsed = Math.abs(maxExpire - (remaining || 0))

        client.get(key, (err, cache) => {
            if (err == null && cache != null && timeElapsed <= validExpire) {
                res.type("json").send(cache)
            } else {
                const oldSend = res.send
                res.send = function(body?: any): Response { // tslint:disable-line only-arrow-functions
                    let fixedBody = body
                    if (res.statusCode === 200) {
                        client.set(key, `${body}`)
                        // 24 hours cache in case of failure (fallback)
                        client.expire(key, maxExpire)
                    } else if (cache != null) {
                        // Use latest cached successful response
                        res.statusCode = 200
                        fixedBody = cache
                    }

                    return oldSend.apply(res, [fixedBody])
                }
                next()
            }
        })
    })
})

app.use("/api", baseRoute)
app.get("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
