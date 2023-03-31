import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

export interface DeployKeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  can_push?: boolean;
  created_at: string;
}

export type CondensedDeployKeySchema = Omit<DeployKeySchema, 'can_push'>;

export interface ExpandedDeployKeySchema extends CondensedDeployKeySchema {
  fingerprint: string;
  projects_with_write_access?: SimpleProjectSchema[];
}

export class DeployKeys<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    {
      projectId,
      ...options
    }: { projectId?: string | number } & PaginationRequestOptions<P> &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<ExpandedDeployKeySchema[], C, E, P>> {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/deploy_keys`;
    } else {
      url = 'deploy_keys';
    }

    return RequestHelper.get<ExpandedDeployKeySchema[]>()(this, url, options);
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    key: string,
    options?: { canPush?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    return RequestHelper.post<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys`,
      {
        title,
        key,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    return RequestHelper.put<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      options,
    );
  }

  enable<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedDeployKeySchema, C, E, void>> {
    return RequestHelper.post<CondensedDeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}/enable`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/deploy_keys/${keyId}`, options);
  }

  show<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    return RequestHelper.get<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      options,
    );
  }
}
