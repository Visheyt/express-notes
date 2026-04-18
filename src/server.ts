import "dotenv/config";
import express from "express";
import { connectDB } from "./db";
import { notesRouter } from "./routes/notes.route";
import { errorHandler } from "./middleware/notes.middleware";

const app = express();
app.use(express.json());
app.use("/notes", notesRouter);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(3000, () => console.log("Сервер на порту 3000"));
};

start();
