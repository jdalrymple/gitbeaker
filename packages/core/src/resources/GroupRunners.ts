import { BaseResource } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, ShowExpanded, RequestHelper } from '../infrastructure';
import { RunnerSchema } from './Runners';

export class GroupRunners<C extends boolean = false> extends BaseResource<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<RunnerSchema[]>()(this, `groups/${gId}/runners`, options);
  }
}
