import {
  accounts,
  categories,
  insertTransactionSchema,
  transactions,
} from "@/db/schema";
import { db } from "@/drizzle.config";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { parse, subDays } from "date-fns";
import { and, desc, eq, gte, inArray, lt, lte, sql } from "drizzle-orm";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const { from, to, accountId } = c.req.valid("query");

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);

      const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;

      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const data = await db
        .select({
          id: transactions.id,
          amount: transactions.amount,
          payee: transactions.payee,
          notes: transactions.notes,
          date: transactions.date,
          categoryId: transactions.categoryId,
          accountId: transactions.accountId,
          category: categories.name,
          account: accounts.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            lte(transactions.date, endDate),
            gte(transactions.date, startDate)
          )
        )
        .orderBy(desc(transactions.date));

      return c.json({
        data: data.map((d) => ({
          ...d,
          amount: convertAmountFromMilliunits(d.amount),
        })),
      });
    }
  )
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const { id } = c.req.valid("param");
      if (!id) return c.json({ error: "Missing id param" }, 400);

      const [data] = await db
        .select({
          id: transactions.id,
          amount: transactions.amount,
          payee: transactions.payee,
          notes: transactions.notes,
          date: transactions.date,
          categoryId: transactions.categoryId,
          accountId: transactions.accountId,
          category: categories.name,
          account: accounts.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(and(eq(transactions.id, id), eq(accounts.userId, auth.userId)));

      if (!data) return c.json({ error: "Transaction not found" }, 404);

      return c.json({
        ...data,
        amount: convertAmountFromMilliunits(data.amount),
      });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertTransactionSchema.omit({ id: true })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const value = c.req.valid("json");

      const [data] = await db
        .insert(transactions)
        .values({ id: createId(), ...value })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-create",
    clerkMiddleware(),
    zValidator("json", z.array(insertTransactionSchema.omit({ id: true }))),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorize" }, 401);

      const values = c.req.valid("json");

      const data = await db
        .insert(transactions)
        .values(values.map((v) => ({ ...v, id: createId() })))
        .returning();

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const { id } = c.req.valid("param");
      if (!id) return c.json({ error: "Missing id param" }, 400);

      const transactionsToDelete = db.$with("transaction_to_delete").as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(eq(transactions.id, id), eq(accounts.userId, auth.userId)))
      );
      const [data] = await db
        .delete(transactions)
        .where(
          inArray(transactions.id, sql`select id from ${transactionsToDelete}`)
        )
        .returning();

      if (!data)
        return c.json({ error: "Transaction not found to delete" }, 404);

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string().min(1)) })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthrozied" }, 401);

      const value = c.req.valid("json");

      const transactionsToDelete = db.$with("transactions_to_delete").as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(
            and(
              eq(accounts.userId, auth.userId),
              inArray(transactions.id, value.ids)
            )
          )
      );

      const data = await db
        .delete(transactions)
        .where(
          inArray(transactions.id, sql`select id from ${transactionsToDelete}`)
        )
        .returning({ id: transactions.id });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", insertTransactionSchema.omit({ id: true })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorization" }, 401);

      const { id } = c.req.valid("param");
      if (!id) return c.json({ error: "Missing id param" }, 400);

      const value = c.req.valid("json");

      const transactionToUpdate = db.$with("transactions_to_update").as(
        db
          .select({ id: transactions })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(eq(accounts.userId, auth.userId), eq(transactions.id, id)))
      );

      const [data] = await db
        .update(transactions)
        .set(value)
        .where(
          inArray(transactions.id, sql`select id from ${transactionToUpdate}`)
        )
        .returning();

      if (!data)
        return c.json({ error: "Transaction not found to update" }, 404);

      return c.json({ data });
    }
  );

export default app;
