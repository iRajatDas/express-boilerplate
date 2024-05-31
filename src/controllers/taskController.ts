import { Request, Response } from "express";
import { tasks } from "../models/task";
import { db } from "../config/database";
import { eq } from "drizzle-orm";
import { takeUniqueOrThrow } from "@/utils/db";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const taskList = await db.select().from(tasks);
    res.status(200).json(taskList);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Fetching tasks failed", error: err.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  if (!title || !description || completed === undefined) {
    return res.status(400).json({
      message: "Invalid input, title, description and completed are required",
    });
  }

  try {
    const newTask = await db
      .insert(tasks)
      .values({
        title,
        description,
        completed,
      })
      .returning();
    res.status(201).json(newTask);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Creating task failed", error: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Invalid input, title, description and completed are required",
    });
  }

  try {
    const updatedTask = await db
      .update(tasks)
      .set({ title, description, completed })
      .where(eq(tasks.id, Number(id)))
      .returning();

    res.status(200).json(updatedTask);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Updating task failed", error: err.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, Number(id)))
      .then(takeUniqueOrThrow);
    res.status(200).json(task);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Fetching task failed", error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.delete(tasks).where(eq(tasks.id, Number(id)));
    res.status(204).send();
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Deleting task failed", error: err.message });
  }
};
