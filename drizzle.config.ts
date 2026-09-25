import assert from "node:assert";
import dotenv from "dotenv";

import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

assert(process.env.DATABASE_URL, "DATABASE_URL must be defined");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
