import { Schema, model, type InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    tags: [String],
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export type NoteType = InferSchemaType<typeof noteSchema>;

export const Note = model<NoteType>("Note", noteSchema);
