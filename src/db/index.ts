import assert from "node:assert";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

assert(process.env.DATABASE_URL, "DATABASE_URL must be defined");

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
