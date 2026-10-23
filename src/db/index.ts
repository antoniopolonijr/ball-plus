import "dotenv/config";

import assert from "node:assert/strict";
import { neon } from "@neondatabase/serverless";
import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

assert(process.env.DATABASE_URL, "DATABASE_URL must be defined");

const sql = neon(process.env.DATABASE_URL);

const relations = defineRelations(schema);

export const db = drizzle({
  client: sql,
  relations,
});
