import { DeploymentSchema, DeployableSchema, ProjectSchema } from '.';

export interface EnvironmentSchema extends Record<string, unknown> {
  id: number;
  name: string;
  slug?: string;
  external_url?: string;
  project?: ProjectSchema;
  state?: string;
  last_deployment?: DeploymentSchema;
  deployable?: DeployableSchema;
}
