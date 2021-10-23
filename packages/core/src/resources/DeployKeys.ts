import { BaseResource } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  Sudo,
  BaseRequestOptions,
  PaginatedRequestOptions,
  endpoint,
} from '../infrastructure';

export interface DeployKeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  can_push?: boolean;
  created_at: string;
}

export class DeployKeys<C extends boolean = false> extends BaseResource<C> {
  add(projectId: string | number, options?: Sudo) {
    return RequestHelper.post<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys`,
      options,
    );
  }

  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/deploy_keys`;
    } else {
      url = 'deploy_keys';
    }

    return RequestHelper.get<Omit<DeployKeySchema, 'can_push'>[]>()(this, url, options);
  }

  edit(projectId: string | number, keyId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      options,
    );
  }

  enable(projectId: string | number, keyId: number, options?: Sudo) {
    return RequestHelper.post<Omit<DeployKeySchema, 'can_push'>>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}/enable`,
      options,
    );
  }

  remove(projectId: string | number, keyId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/deploy_keys/${keyId}`, options);
  }

  show(projectId: string | number, keyId: number, options?: Sudo) {
    return RequestHelper.get<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      options,
    );
  }
}
