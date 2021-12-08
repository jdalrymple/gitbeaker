import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, endpoint, RequestHelper } from '../infrastructure';
import { EpicSchema } from './Epics';

/**
 * ## Epic Links API
 *
 * > Introduced in GitLab 11.8.
 *
 * Manages parent-child epic relationships.
 *
 * https://docs.gitlab.com/ee/api/epic_links.html
 *
 */

export class EpicLinks<C extends boolean = false> extends BaseResource<C> {
  // https://docs.gitlab.com/ee/api/epic_links.html#list-epics-related-to-a-given-epic
  all(groupId: string | number, epicIid: number, options?: BaseRequestOptions) {
    return RequestHelper.get<EpicSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIid}/epics`,
      options,
    );
  }

  // https://docs.gitlab.com/ee/api/epic_links.html#assign-a-child-epic
  assign(
    groupId: string | number,
    epicIid: number,
    childEpicId: number,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<EpicSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIid}/epics/${childEpicId}`,
      options,
    );
  }

  // https://docs.gitlab.com/ee/api/epic_links.html#create-and-assign-a-child-epic
  create(groupId: string | number, epicIid: number, title: string, options?: BaseRequestOptions) {
    return RequestHelper.post<EpicSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIid}/epics`,
      {
        title,
        ...options,
      },
    );
  }

  // https://docs.gitlab.com/ee/api/epic_links.html#re-order-a-child-epic
  reorder(
    groupId: string | number,
    epicIid: number,
    childEpicId: number,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.put<EpicSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIid}/epics/${childEpicId}`,
      options,
    );
  }

  // https://docs.gitlab.com/ee/api/epic_links.html#unassign-a-child-epic
  unassign(
    groupId: string | number,
    epicIid: number,
    childEpicId: number,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.del<EpicSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIid}/epics/${childEpicId}`,
      options,
    );
  }
}
