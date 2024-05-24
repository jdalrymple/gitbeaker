import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
} from '../infrastructure';
import type { ReleaseSchema } from './ProjectReleases';

export class GroupReleases<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ReleaseSchema[], C, E, P>> {
    return RequestHelper.get<ReleaseSchema[]>()(
      this,
      endpoint`groups/${groupId}/releases`,
      options,
    );
  }
}
