import { accounts } from "@/db/schema";
import { db } from "@/drizzle.config";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
    .get("/",
        clerkMiddleware(),
        async (c) => {

            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

            return c.json({ accounts: data });
        });

export default app;