import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

export default defineConfig({
    schema: "./db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});

export const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);
