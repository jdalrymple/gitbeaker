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

export interface FeatureFlagUserListSchema extends Record<string, unknown> {
  name: string;
  user_xids: string;
  id: number;
  iid: number;
  project_id: string | number;
  created_at: string;
  updated_at: string;
}

export class FeatureFlagUserLists<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagUserListSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FeatureFlagUserListSchema[]>()(
      this,
      endpoint`projects/${projectId}/feature_flags_user_lists`,
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

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    userXids: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagUserListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<FeatureFlagUserListSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags_user_lists`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          userXids,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    featureFlagUserListIId: string | number,
    options?: { name?: string; userXIds?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagUserListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<FeatureFlagUserListSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags_user_lists/${featureFlagUserListIId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    featureFlagUserListIId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/feature_flags_user_lists/${featureFlagUserListIId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    featureFlagUserListIId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagUserListSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<FeatureFlagUserListSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags_user_lists/${featureFlagUserListIId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
