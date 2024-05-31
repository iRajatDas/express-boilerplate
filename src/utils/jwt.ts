import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};