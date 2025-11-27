import mongoose, { Schema, models, Document } from "mongoose";

export interface INoteDoc extends Document {
  userId:string,
  noteName: string;
  tags: string[];
  heading?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INoteDoc>(
  {
    userId: { type: String, required: true },
    noteName: { type: String, required: true, trim: true },
    tags: { type: [String], default: ["general"] },
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

NoteSchema.index({ tags: 1 });

const Note = models.Note || mongoose.model<INoteDoc>("Note", NoteSchema);
export default Note;
