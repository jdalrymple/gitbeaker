import { UserSchema } from '.';
import { EnvironmentSchema } from './EnvironmentSchema';
import { DeployableSchema } from './DeployableSchema';
import { DeploymentStatus } from './DeploymentStatus';

export type DeploymentSchema = {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchema;
  created_at: string;
  updated_at: string;
  status: DeploymentStatus;
  deployable: DeployableSchema;
  environment: EnvironmentSchema;
};
