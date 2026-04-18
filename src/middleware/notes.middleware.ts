import type { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.message);

  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({ error: "Невалидный id" });
  }

  res.status(500).json({ error: "Внутренняя ошибка сервера" });
};

export { errorHandler };
