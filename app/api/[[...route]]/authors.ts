import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";


const app = new Hono()
    .get("/",
        clerkMiddleware(),
        (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

            return c.json('list authors')
        })
    .post("/", (c) => c.json('create a authors', 201))
    .get("/:id",
        zValidator('param', z.object({
            id: z.string(),
        })),
        (c) => {
            const { id } = c.req.valid('param');
            if (!id) return c.json({ error: "missing id" }, 400);

            return c.json(`list author: ${id}`)
        });

export default app;

// const GET = (request: NextRequest, { params }: { params: { testId: string } }) => {
//     return NextResponse.json('hello');
// }