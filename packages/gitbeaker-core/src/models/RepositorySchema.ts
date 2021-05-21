import { TagSchema } from './TagSchema';

export interface RepositorySchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  project_id: number;
  location: string;
  created_at: string;
  cleanup_policy_started_at: string;
  tags_count?: number;
  tags?: Pick<TagSchema, 'name' | 'path' | 'location'>[];
}
