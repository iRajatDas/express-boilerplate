"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 96 }).notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 255 }),
    completed: (0, pg_core_1.boolean)("completed").notNull().default(false),
});
