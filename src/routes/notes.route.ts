import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { Note, type NoteType } from "../models/note.model";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  async (req: Request<{}, {}, NoteType>, res: Response, next: NextFunction) => {
    try {
      const note = await Note.create(req.body);
      res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  "/:id",
  async (
    req: Request<{ id: string }, {}, Partial<NoteType>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(note);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
);

export { router as notesRouter };
