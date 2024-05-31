import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 96 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export type User = typeof users.$inferSelect;
