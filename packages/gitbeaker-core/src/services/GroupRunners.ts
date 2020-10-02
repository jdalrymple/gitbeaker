import { BaseService } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { RunnerSchema } from './Runners';

export class GroupRunners extends BaseService {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<RunnerSchema[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/runners`, options) as Promise<RunnerSchema[]>;
  }
}
