import { UserSchema } from '.';

export interface CommentSchema extends Record<string, unknown> {
  note: string;
  line_type: 'new' | 'old';
  path: string;
  line: number;
  author: Omit<UserSchema, 'created_at'>;
}
