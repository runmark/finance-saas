import { Hono } from "hono";
import authors from "./authors";
import books from "./books";
import { handle } from "hono/vercel";
import { clerkMiddleware } from "@hono/clerk-auth";


// export const runtime = 'edge'

const app = new Hono().basePath('/api');

// app.use('*', clerkMiddleware());

const routes = app
    .route('/authors', authors)
    .route('/books', books);

export default app;

// export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);