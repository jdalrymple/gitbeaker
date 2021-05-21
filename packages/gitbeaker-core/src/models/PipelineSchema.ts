import { PipelineStatus, UserSchema } from '.';

export interface PipelineSchema extends Record<string, unknown> {
  id: number;
  status: PipelineStatus;
  ref: string;
  sha: string;
  web_url: string;
  created_at: string;
  updated_at: string;
  user: Pick<UserSchema, 'name' | 'avatar_url'>;
}
