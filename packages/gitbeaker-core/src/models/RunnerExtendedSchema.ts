import { ProjectSchema, RunnerSchema } from '.';

export interface RunnerExtendedSchema extends RunnerSchema {
  architecture?: string;
  description: string;
  contacted_at: string;
  platform?: string;
  projects?: Pick<
    ProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  revision?: string;
  tag_list?: string[];
  version?: string;
  access_level: string;
  maximum_timeout?: number;
}
