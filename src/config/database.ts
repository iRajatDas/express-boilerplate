import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

let db: ReturnType<typeof drizzle>;

(async () => {
  try {
    await pool.connect();
    db = drizzle(pool);
  } catch (error) {
    console.error("Failed to connect to database: \n\n", error, "\n\n\n");
  }
})();

export { db, pool };
