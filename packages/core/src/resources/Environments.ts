import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
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

export class Environments<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>[]>()(
      this,
      endpoint`projects/${projectId}/environments`,
      options,
    );
  }

  show(projectId: string | number, environmentId: number, options?: Sudo) {
    return RequestHelper.get<EnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      endpoint`projects/${projectId}/environments`,
      options,
    );
  }

  edit(projectId: string | number, environmentId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  remove(projectId: string | number, environmentId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  stop(projectId: string | number, environmentId: number, options?: Sudo) {
    return RequestHelper.post<Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}/stop`,
      options,
    );
  }
}
