import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

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
    options?: OneOrNoneOf<{ projectId: string | number; userId: string | number }> & {
      public?: boolean;
    } & PaginationRequestOptions<P> &
      BaseRequestSearchParams &
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
      searchParams
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    key: string,
    options?: { canPush?: boolean } & Sudo & ShowExpanded<E>,
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
    options?: { canPush?: boolean; title?: string } & Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
