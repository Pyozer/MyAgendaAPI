import { Router } from "express"

type Wrapper = ((router: Router) => void)

export const applyMiddlewares = (middlewares: Wrapper[], router: Router) => {
    for (const middleware of middlewares) {
        middleware(router)
    }
}
