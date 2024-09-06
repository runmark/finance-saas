import { accounts } from "@/db/schema";
import { db } from "@/drizzle.config";
import { Hono } from "hono";

const app = new Hono()
    .get("/", async (c) => {
        const data = await db.select({
            id: accounts.id,
            name: accounts.name,
        }).from(accounts);

        return c.json({ accounts: data });
    });

export default app;