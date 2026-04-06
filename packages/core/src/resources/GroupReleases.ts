import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ReleaseSchema } from './ProjectReleases';

export class GroupReleases<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ReleaseSchema[]>()(this, endpoint`groups/${groupId}/releases`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }
}
