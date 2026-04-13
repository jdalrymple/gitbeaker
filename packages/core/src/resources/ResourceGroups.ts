import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { JobSchema } from './Jobs';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface ResourceGroupSchema extends Record<string, unknown> {
  id: number;
  key: string;
  process_mode: string;
  created_at: string;
  updated_at: string;
}

export class ResourceGroups<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ResourceGroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ResourceGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/resource_groups`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: {
      processMode?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ResourceGroupSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ResourceGroupSchema>()(
      this,
      endpoint`projects/${projectId}/resource_groups/${key}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ResourceGroupSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ResourceGroupSchema>()(
      this,
      endpoint`projects/${projectId}/resource_groups/${key}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allUpcomingJobs<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<JobSchema[]>()(
      this,
      endpoint`projects/${projectId}/resource_groups/${key}/upcoming_jobs`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
