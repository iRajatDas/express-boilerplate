"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
var zod_1 = require("zod");
dotenv_1.default.config();
var EnvSchema = zod_1.z.object({
    DB_USER: zod_1.z
        .string({
        description: "The username for the database",
        required_error: "😱 You forgot to add a database user",
    })
        .min(1),
    DB_HOST: zod_1.z
        .string({
        description: "The host for the database",
        required_error: "😱 You forgot to add a database host",
    })
        .min(1),
    DB_NAME: zod_1.z
        .string({
        description: "The name of the database",
        required_error: "😱 You forgot to add a database name",
    })
        .min(1),
    DB_PASSWORD: zod_1.z
        .string({
        description: "The password for the database",
        required_error: "😱 You forgot to add a database password",
    })
        .min(0),
    DB_PORT: zod_1.z.coerce
        .number({
        description: ".env files convert numbers to strings, therefore we have to enforce them to be numbers",
    })
        .positive()
        .max(65536, "options.port should be >= 0 and < 65536")
        .default(5432),
    JWT_SECRET: zod_1.z
        .string({
        description: "The secret key for the JWT",
        required_error: "😱 You forgot to add a JWT secret",
    })
        .min(1),
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"], {
        description: "This gets updated depending on your environment",
    })
        .default("development"),
    PORT: zod_1.z.coerce
        .number({
        description: ".env files convert numbers to strings, therefoore we have to enforce them to be numbers",
    })
        .positive()
        .max(65536, "options.port should be >= 0 and < 65536")
        .default(3000),
});
exports.env = EnvSchema.parse(process.env);
