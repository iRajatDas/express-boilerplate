import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  DB_USER: z
    .string({
      description: "The username for the database",
      required_error: "😱 You forgot to add a database user",
    })
    .min(1),

  DB_HOST: z
    .string({
      description: "The host for the database",
      required_error: "😱 You forgot to add a database host",
    })
    .min(1),

  DB_NAME: z
    .string({
      description: "The name of the database",
      required_error: "😱 You forgot to add a database name",
    })
    .min(1),

  DB_PASSWORD: z
    .string({
      description: "The password for the database",
      required_error: "😱 You forgot to add a database password",
    })
    .min(0),

  DB_PORT: z.coerce
    .number({
      description:
        ".env files convert numbers to strings, therefore we have to enforce them to be numbers",
    })
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(5432),

  JWT_SECRET: z
    .string({
      description: "The secret key for the JWT",
      required_error: "😱 You forgot to add a JWT secret",
    })
    .min(1),

  NODE_ENV: z
    .enum(["development", "test", "production"], {
      description: "This gets updated depending on your environment",
    })
    .default("development"),
  PORT: z.coerce
    .number({
      description:
        ".env files convert numbers to strings, therefoore we have to enforce them to be numbers",
    })
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(3000),
});

export const env = EnvSchema.parse(process.env);
