import { BaseService } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { RunnerSchema } from './Runners';

export class GroupRunners<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C, RunnerSchema<C>[]>(this, `groups/${gId}/runners`, options);
  }
}
