export interface INote {
  _id: string;
  noteName: string;
  tags: string[];
  heading?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_TAGS = [
  "general",
  "college",
  "productive",
  "lecture",
  "personal",
  "work",
  "important"
] as const;
