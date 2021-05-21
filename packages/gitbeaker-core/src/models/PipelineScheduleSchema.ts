import { UserSchema } from '.';

export interface PipelineScheduleSchema extends Record<string, unknown> {
  id: number;
  description: string;
  ref: string;
  cron: string;
  cron_timezone: string;
  next_run_at: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  owner: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
}
