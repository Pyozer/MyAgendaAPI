import { config as dotEnvConfig } from "dotenv"
import express, { Application, NextFunction, Request, Response } from "express"
import redis from "redis"
import * as Sentry from '@sentry/node';
import middlewares from "./middlewares"
import baseRoute from "./routes/base"
import { welcome } from "./routes/welcome"
import { applyMiddlewares } from "./utils"

dotEnvConfig()
const { PORT = 3000, REDIS_URL, ENVIRONMENT = "dev", SENTRY_DSN } = process.env

const app: Application = express()

Sentry.init({ dsn: SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler())

const client = redis.createClient(REDIS_URL)
applyMiddlewares(middlewares, app)

app.use((req: Request, res: Response, next: NextFunction) => {
    const { url: key } = req

    const maxExpire = ENVIRONMENT === "dev" ? 5 : (60 * 60 * 12) // Maximum cache duration (12 hours)

    let validExpire = 60 * 5 // 5 minutes of cache
    if (key.startsWith("/api/resources") || key.startsWith("/api/helps")) {
        validExpire = maxExpire // 12 hours cache
    }

    client.ttl(key, (_, remaining) => {
        const timeElapsed = Math.abs(maxExpire - (remaining || 0))

        client.get(key, (err, cache) => {
            if (!err && cache && timeElapsed <= validExpire) {
                return res.type("json").send(cache)
            }

            const oldSend = res.send
            res.send = function (body?: any): Response { // tslint:disable-line only-arrow-functions
                if (res.statusCode === 200) {
                    // 12 hours cache in case of failure (fallback)
                    client.setex(key, maxExpire, `${body}`)
                    return oldSend.apply(res, [body])
                }

                // Use latest cached successful response or classic body
                if (cache) {
                    res.statusCode = 200
                }
                return oldSend.apply(res, [cache || body])
            }
            next()
        })
    })
})

app.use("/api", baseRoute)
app.get("/", welcome)

app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
