import { Hono } from "hono";
import { handle } from "hono/vercel";
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";


// export const runtime = 'edge'

const app = new Hono().basePath('/api');

// app.use('*', clerkMiddleware());

const routes = app
    .route('/authors', authors)
    .route('/books', books)
    .route('/accounts', accounts);

// app.onError((err, c) => {
//     return c.json({ error: err.message }, err.status);
// });

export default app;

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;