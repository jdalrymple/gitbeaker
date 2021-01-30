import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  Camelize,
} from '../infrastructure';
import { DeploymentSchema, Deployable } from './Deployments';
import { ProjectSchema } from './Projects';

export interface EnvironmentSchemaDefault<C> extends Record<string, unknown> {
  id: number;
  name: string;
  slug?: string;
  external_url?: string;
  project?: ProjectSchema<C>;
  state?: string;
}

export type EnvironmentSchema<C extends boolean> = C extends true
  ? Camelize<EnvironmentSchemaDefault<C>>
  : EnvironmentSchemaDefault<C>;

export interface EnvironmentDetailSchemaDefault<C extends boolean>
  extends EnvironmentSchemaDefault<C> {
  last_deployment?: DeploymentSchema<C>;
  deployable?: Deployable<C>;
}

export type EnvironmentDetailSchema<C extends boolean> = C extends true
  ? Camelize<EnvironmentDetailSchemaDefault<C>>
  : EnvironmentDetailSchemaDefault<C>;

export class Environments<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C, EnvironmentSchema<C>[]>(
      this,
      `projects/${pId}/environments`,
      options,
    );
  }

  show(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return RequestHelper.get<C, EnvironmentDetailSchema<C>>(
      this,
      `projects/${pId}/environments/${eId}`,
      options,
    );
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/environments`, options);
  }

  edit(projectId: string | number, environmentId: number, options?: BaseRequestOptions) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/environments/${eId}`, options);
  }

  stop(projectId: string | number, environmentId: number, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/environments/${eId}/stop`, options);
  }
}
