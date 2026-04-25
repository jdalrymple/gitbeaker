import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface CondensedDeployKeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  created_at: string;
}

export interface DeployKeySchema extends CondensedDeployKeySchema {
  fingerprint: string;
  fingerprint_sha256: string;
  expires_at?: string;
  can_push?: boolean;
}

export interface ExpandedDeployKeySchema extends DeployKeySchema {
  projects_with_write_access?: SimpleProjectSchema[];
}

export class DeployKeys<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      public?: boolean;
    } & BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; userId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ExpandedDeployKeySchema[], C, E, P>> {
    const { showExpanded, sudo, maxPages, projectId, userId, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, userId }, { minExpected: 0 });

    const url = userId
      ? getPrefixedUrl('project_deploy_keys', { users: userId })
      : getPrefixedUrl('deploy_keys', { projects: projectId });

    return RequestHelper.get<ExpandedDeployKeySchema[]>()(this, url, {
      showExpanded,
      sudo,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    key: string,
    options?: { canPush?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    const { showExpanded, sudo, ...body } = options || {};

    return RequestHelper.post<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys`,
      {
        showExpanded,
        sudo,
        body: {
          ...body,
          title,
          key,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: { canPush?: boolean; title?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    const { showExpanded, sudo, ...body } = options || {};

    return RequestHelper.put<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      {
        showExpanded,
        sudo,
        body,
      },
    );
  }

  enable<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedDeployKeySchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<CondensedDeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}/enable`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/deploy_keys/${keyId}`, {
      showExpanded,
      sudo,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    keyId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeployKeySchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<DeployKeySchema>()(
      this,
      endpoint`projects/${projectId}/deploy_keys/${keyId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
