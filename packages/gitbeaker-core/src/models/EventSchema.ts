import { UserSchema } from '.';

export interface EventSchema extends Record<string, unknown> {
  id: number;
  title?: string;
  project_id: number;
  action_name: string;
  target_id: number;
  target_type: string;
  author_id: number;
  target_title: string;
  created_at: string;
  author: Omit<UserSchema, 'created_at'>;
  author_username: string;
}
