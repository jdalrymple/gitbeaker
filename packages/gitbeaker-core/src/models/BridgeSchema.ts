import { CommitSchema, UserSchema, PipelineSchema } from '.';

export interface BridgeSchema extends Record<string, unknown> {
  commit: Pick<
    CommitSchema,
    'id' | 'short_id' | 'author_name' | 'author_email' | 'message' | 'title' | 'created_at'
  >;
  coverage?: string;
  allow_failure: boolean;
  created_at: string;
  started_at: string;
  finished_at: string;
  duration: number;
  queued_duration: number;
  id: number;
  name: string;
  pipeline: Exclude<PipelineSchema & { project_id: number }, 'user'>;
  ref: string;
  stage: string;
  status: string;
  tag: boolean;
  web_url: string;
  user: UserSchema;
  downstream_pipeline: Exclude<PipelineSchema, 'user'>;
}
