import express, { Application } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app: Application = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;
