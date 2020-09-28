import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import {
  DeploymentSchemaDefault,
  DeploymentSchemaCamelized,
  DeployableDefault,
  DeployableCamelized,
} from './Deployments';
import { ProjectSchemaDefault, ProjectSchemaCamelized } from './Projects';

export interface EnvironmentSchemaDefault {
  id: number;
  name: string;
  slug?: string;
  external_url?: string;
  project?: ProjectSchemaDefault;
  state?: string;
}

export interface EnvironmentSchemaCamelized {
  id: number;
  name: string;
  slug?: string;
  externalUrl?: string;
  project?: ProjectSchemaCamelized;
  state?: string;
}

// ref: https://docs.gitlab.com/12.6/ee/api/environments.html#list-environments
export type EnvironmentSchema = EnvironmentSchemaDefault | EnvironmentSchemaCamelized;

export interface EnvironmentDetailSchemaDefault extends EnvironmentSchemaDefault {
  last_deployment?: DeploymentSchemaDefault;
  deployable?: DeployableDefault;
}

export interface EnvironmentDetailSchemaCamelized extends EnvironmentSchemaCamelized {
  lastDeployment?: DeploymentSchemaCamelized;
  deployable?: DeployableCamelized;
}

export type EnvironmentDetailSchema =
  | EnvironmentDetailSchemaDefault
  | EnvironmentDetailSchemaCamelized;

export class Environments extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions): Promise<EnvironmentSchema[]> {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options) as Promise<
      EnvironmentSchema[]
    >;
  }

  show(
    projectId: string | number,
    environmentId: number,
    options?: Sudo,
  ): Promise<EnvironmentDetailSchema> {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return RequestHelper.get(this, `projects/${pId}/environments/${eId}`, options) as Promise<
      EnvironmentDetailSchema
    >;
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/environments`, options);
  }

  edit(projectId: string | number, environmentId: number, options?: BaseRequestOptions) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/environments/${eId}`, options);
  }

  stop(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`, options);
  }
}
