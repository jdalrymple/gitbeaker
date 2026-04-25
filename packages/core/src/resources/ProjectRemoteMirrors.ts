import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface ProjectRemoteMirrorSchema extends Record<string, unknown> {
  enabled: boolean;
  id: number;
  last_error?: string;
  last_successful_update_at: string;
  last_update_at: string;
  last_update_started_at: string;
  only_protected_branches: boolean;
  keep_divergent_refs: boolean;
  update_status: string;
  url: string;
}

export class ProjectRemoteMirrors<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectRemoteMirrorSchema[]>()(
      this,
      endpoint`projects/${projectId}/remote_mirrors`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  // Helper method - Duplicated from Projects
  createPullMirror<E extends boolean = false>(
    projectId: string | number,
    url: string,
    mirror: boolean,
    options?: { onlyProtectedBranches?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          importUrl: url,
          mirror,
        },
      },
    );
  }

  createPushMirror<E extends boolean = false>(
    projectId: string | number,
    url: string,
    options?: {
      enabled?: boolean;
      onlyProtectedBranches?: boolean;
      keepDivergentRefs?: boolean;
      mirrorBranchRegex?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/remote_mirrors`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          url,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    mirrorId: number,
    options?: {
      enabled?: boolean;
      onlyProtectedBranches?: boolean;
      keepDivergentRefs?: boolean;
      mirrorBranchRegex?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/remote_mirrors/${mirrorId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mirrorId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/remote_mirrors/${mirrorId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    mirrorId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/remote_mirrors/${mirrorId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  sync<E extends boolean = false>(
    projectId: string | number,
    mirrorId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/remote_mirrors/${mirrorId}/sync`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}
