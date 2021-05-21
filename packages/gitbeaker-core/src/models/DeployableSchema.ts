import { CommitSchema, DeploymentStatus, PipelineSchema, RunnerSchema, UserSchema } from '.';

export interface DeployableSchema {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchema;
  stage?: string;
  started_at?: Date;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchema;
  coverage?: string;
  created_at?: Date;
  finished_at?: Date;
  user?: UserSchema;
  pipeline?: PipelineSchema;
}
