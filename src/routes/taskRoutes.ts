import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTask);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
