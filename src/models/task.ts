import { serial, varchar, boolean, pgTable } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 96 }).notNull(),
  description: varchar("description", { length: 255 }),
  completed: boolean("completed").notNull().default(false),
});

export type Task = typeof tasks.$inferSelect;
