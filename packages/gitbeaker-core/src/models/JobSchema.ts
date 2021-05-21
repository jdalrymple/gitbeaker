import { ArtifactSchema, CommitSchema, RunnerSchema, UserSchema, PipelineSchema } from '.';

export interface JobSchema extends Record<string, unknown> {
  id: number;
  status: string;
  stage: string;
  name: string;
  ref: string;
  tag: boolean;
  coverage?: string;
  allow_failure: boolean;
  created_at: Date;
  started_at?: Date;
  finished_at?: Date;
  duration?: number;
  user: UserSchema;
  commit: CommitSchema;
  pipeline: PipelineSchema;
  web_url: string;
  artifacts: ArtifactSchema[];
  runner: RunnerSchema;
  artifacts_expire_at?: Date;
  tag_list?: string[];
}
