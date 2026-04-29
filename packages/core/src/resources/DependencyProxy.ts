import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export class DependencyProxy<C extends boolean = false> extends BaseResource<C> {
  remove<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<void>()(this, `groups/${groupId}/dependency_proxy/cache`, {
      showExpanded,
      sudo,
    });
  }
}
