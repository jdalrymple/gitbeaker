import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { DeploymentSchema, DeployableSchema } from './Deployments';
import { ProjectSchema } from './Projects';

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

export class Environments extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>[]>()(
      this,
      `projects/${pId}/environments`,
      options,
    );
  }

  show(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return RequestHelper.get<EnvironmentSchema>()(
      this,
      `projects/${pId}/environments/${eId}`,
      options,
    );
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      `projects/${pId}/environments`,
      options,
    );
  }

  edit(projectId: string | number, environmentId: number, options?: BaseRequestOptions) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      `projects/${pId}/environments/${eId}`,
      options,
    );
  }

  remove(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/environments/${eId}`, options);
  }

  stop(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      `projects/${pId}/environments/${eId}/stop`,
      options,
    );
  }
}
