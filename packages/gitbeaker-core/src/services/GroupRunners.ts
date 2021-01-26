import { BaseService } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { RunnerSchema } from './Runners';

export class GroupRunners<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<RunnerSchema<C>[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C>(this, `groups/${gId}/runners`, options) as Promise<
      RunnerSchema<C>[]
    >;
  }
}
