import { Hono } from "hono"
import { cors } from "hono/cors"
import { authRouter } from "./routers/auth-router"
import { categoryRouter } from "./routers/category-router"
import { paymentRouter } from "./routers/payment-router"
import { projectRouter } from "./routers/project-router"

const app = new Hono().basePath("/api").use(cors())

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
// const appRouter = app.route("/post", postRouter)
const appRouter = app
    .route("/auth", authRouter)
    .route("/category", categoryRouter)
    .route("/payment", paymentRouter)
    .route("/project", projectRouter)

export { app }

export type AppType = typeof appRouter
