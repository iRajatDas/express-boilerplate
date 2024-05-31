import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { users } from "../models/user";
import { db } from "../config/database";
import { eq } from "drizzle-orm";
import { takeUniqueOrThrow } from "@/utils/db";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide a username and password.",
    });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await db.insert(users).values({
      username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "User registration failed", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .then(takeUniqueOrThrow);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
