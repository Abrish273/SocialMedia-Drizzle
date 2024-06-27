import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

console.log("hi");
console.log(" URI: ", process.env.DATABASE_URI);

const migrationClient = postgres(process.env.DATABASE_URI as string);

async function main() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./src/drizzle/migrations",
    });
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    migrationClient.end();
  }
}

main().catch((error) => console.error("Main function error:", error));
