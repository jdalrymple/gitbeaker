import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export type DeployTokenScope =
  | 'read_repository'
  | 'read_registry'
  | 'write_registry'
  | 'read_package_registry'
  | 'write_package_registry';

export interface DeployTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  expires_at: string;
  revoked: boolean;
  expired: boolean;
  scopes?: DeployTokenScope[];
}

export interface NewDeployTokenSchema extends DeployTokenSchema {
  token: string;
}

export class DeployTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      active?: boolean;
    } & BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DeployTokenSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('deploy_tokens', { projects: projectId, groups: groupId });

    return RequestHelper.get<DeployTokenSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    name: string,
    scopes: DeployTokenScope[],
    options?: {
      expires_at?: string;
      username?: string;
    } & OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<NewDeployTokenSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded, ...body } = options || {};

    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl('deploy_tokens', { projects: projectId, groups: groupId });

    return RequestHelper.post<NewDeployTokenSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
        scopes,
      },
    });
  }

  remove<E extends boolean = false>(
    tokenId: number,
    options?: OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded } = options || {};

    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(`deploy_tokens/${tokenId}`, {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    tokenId: number,
    options?: OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DeployTokenSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded } = options || {};

    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(`deploy_tokens/${tokenId}`, {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.get<DeployTokenSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
