import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { drizzle } from "drizzle-orm/node-postgres";

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

// use neon db
// import { neon } from "@neondatabase/serverless";
// export const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
// export const db = drizzle(sql);

export const db = drizzle(process.env.DRIZZLE_DATABASE_URL!);
