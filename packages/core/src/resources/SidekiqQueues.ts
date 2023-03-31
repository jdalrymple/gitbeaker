import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse } from '../infrastructure';

export interface SidekiqQueueStatus extends Record<string, unknown> {
  completed: boolean;
  deleted_jobs: number;
  queue_size: number;
}

export class SidekiqQueues<C extends boolean = false> extends BaseResource<C> {
  remove<E extends boolean = false>(
    queueName: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<SidekiqQueueStatus, C, E, void>> {
    return RequestHelper.get<SidekiqQueueStatus>()(
      this,
      endpoint`admin/sidekiq/queues/${queueName}`,
      options,
    );
  }
}
