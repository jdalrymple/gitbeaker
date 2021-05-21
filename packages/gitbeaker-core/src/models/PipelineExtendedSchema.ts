import { UserSchema } from '.';
import { PipelineSchema } from './PipelineSchema';

export interface PipelineExtendedSchema extends PipelineSchema {
  project_id: number;
  before_sha: string;
  tag: boolean;
  yaml_errors?: string;
  user: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  started_at?: string;
  finished_at: string;
  committed_at?: string;
  duration?: string;
  coverage?: string;
}
