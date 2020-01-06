import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { DeploymentSchema } from './Deployments';
import { ProjectSchema } from './Projects';

// ref: https://docs.gitlab.com/12.6/ee/api/environments.html#list-environments
export interface EnvironmentSchema {
  id: number;
  name: string;
  slug?: string;
  external_url?: string;
  project?: ProjectSchema;
  state?: string;
}

export interface EnvironmentDetailSchema extends EnvironmentSchema {
  last_deployment?: DeploymentSchema;
  deployable?: DeploymentSchema;
}

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
