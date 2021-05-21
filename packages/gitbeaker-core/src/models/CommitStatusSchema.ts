import { UserSchema } from '.';

export interface CommitStatusSchema extends Record<string, unknown> {
  status: string;
  created_at: string;
  started_at?: string;
  name: string;
  allow_failure: boolean;
  author: Omit<UserSchema, 'created_at'>;
  description?: string;
  sha: string;
  target_url: string;
  finished_at?: string;
  id: number;
  ref: string;
}
