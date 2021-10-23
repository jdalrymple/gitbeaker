import { BaseResource } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, ShowExpanded, RequestHelper, endpoint } from '../infrastructure';
import { RunnerSchema } from './Runners';

export class GroupRunners<C extends boolean = false> extends BaseResource<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions & ShowExpanded) {
    return RequestHelper.get<RunnerSchema[]>()(this, endpoint`groups/${groupId}/runners`, options);
  }
}
