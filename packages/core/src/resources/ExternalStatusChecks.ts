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
    options: { mergerequestIId: number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MergeRequestExternalStatusCheckSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { mergerequestIId?: number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<any> {
    const { mergerequestIId, ...opts } = options || {};
    let url: string = endpoint`projects/${projectId}`;

    if (mergerequestIId) {
      url += endpoint`/merge_requests/${mergerequestIId}/status_checks`;
    } else {
      url += '/external_status_checks';
    }

    return RequestHelper.get<
      (MergeRequestExternalStatusCheckSchema | ProjectExternalStatusCheckSchema)[]
    >()(this, url, opts);
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    externalUrl: string,
    options?: { protectedBrancheIds: number[] } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    return RequestHelper.post<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/external_status_checks`,
      {
        name,
        externalUrl,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    externalStatusCheckId: number,
    options?: {
      protectedBrancheIds?: number[];
      externalUrl?: string;
      name?: string;
    } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    return RequestHelper.put<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/external_status_checks/${externalStatusCheckId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    externalStatusCheckId: number,
    options?: { protectedBrancheIds?: number[] } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/external_status_checks/${externalStatusCheckId}`,
      options,
    );
  }

  set<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    sha: string,
    externalCheckStatusId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    return RequestHelper.post<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/status_check_responses`,
      {
        sha,
        externalCheckStatusId,
        ...options,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    sha: string,
    externalCheckStatusId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectExternalStatusCheckSchema, C, E, void>> {
    return RequestHelper.post<ProjectExternalStatusCheckSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/status_check_responses`,
      {
        sha,
        externalCheckStatusId,
        ...options,
      },
    );
  }
}
