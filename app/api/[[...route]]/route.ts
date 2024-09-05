import { Hono } from "hono";
import { handle } from "hono/vercel";
import authors from "./authors";
import books from "./books";


// export const runtime = 'edge'

const app = new Hono().basePath('/api');

// app.use('*', clerkMiddleware());

const routes = app
    .route('/authors', authors)
    .route('/books', books);

export default app;

// export type AppType = typeof routes; // used for tRPC

export const GET = handle(app);
export const POST = handle(app);