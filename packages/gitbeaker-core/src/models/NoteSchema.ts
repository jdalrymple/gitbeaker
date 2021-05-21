import { UserSchema } from '.';

export interface NoteSchema extends Record<string, unknown> {
  id: number;
  body: string;
  author: UserSchema;
  created_at: string;
  updated_at: string;
  confidential: boolean;
}
