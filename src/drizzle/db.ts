import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

console.log("Database URI: ", process.env.DATABASE_URI);
const client = postgres(process.env.DATABASE_URI as string);
export const db = drizzle(client, { schema, logger: true });
