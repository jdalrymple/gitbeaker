import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface BaseExternalStatusCheckSchema extends Record<string, unknown> {
  id: number;
  name: string;
  external_url: string;
  status: string;
}

export type MergeRequestExternalStatusCheckSchema = BaseExternalStatusCheckSchema;

export interface ExternalStatusCheckProtectedBranchesSchema {
  id: number;
  project_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code_owner_approval_required: boolean;
}

export interface ProjectExternalStatusCheckSchema extends BaseExternalStatusCheckSchema {
  project_id: number;
  protected_branches?: ExternalStatusCheckProtectedBranchesSchema[];
}

export class ExternalStatusChecks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { mergerequestIId: number } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestExternalStatusCheckSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { mergerequestIId?: number } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<any> {
    const { mergerequestIId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    const url = getPrefixedUrl(mergerequestIId ? 'status_checks' : 'external_status_checks', {
      projects: projectId,
      merge_requests: mergerequestIId,
    });

    return RequestHelper.get<
      (MergeRequestExternalStatusCheckSchema | ProjectExternalStatusCheckSchema)[]
    >()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    externalUrl: string,
    options?: { protectedBranchIds: number[] } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/external_status_checks`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          externalUrl,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    externalStatusCheckId: number,
    options?: {
      protectedBranchIds?: number[];
      externalUrl?: string;
      name?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/external_status_checks/${externalStatusCheckId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    externalStatusCheckId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/external_status_checks/${externalStatusCheckId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  set<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    sha: string,
    externalStatusCheckId: number,
    options?: { status?: 'passed' | 'failed' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/status_check_responses`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          sha,
          externalStatusCheckId,
        },
      },
    );
  }
}
