import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { EnvironmentSchema } from '../models';

export class Environments<C extends boolean = false> extends BaseService<C> {
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
