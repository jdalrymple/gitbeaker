import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface SidekiqQueueStatus extends Record<string, unknown> {
  completed: boolean;
  deleted_jobs: number;
  queue_size: number;
}

export type RemoveSidekiqQueueOptions = {
  user?: string;
  project?: string;
  rootNamespace?: string;
  subscriptionPlan?: string;
  callerId?: string;
  featureCategory?: string;
  workerClass?: string;
};

export class SidekiqQueues<C extends boolean = false> extends BaseResource<C> {
  remove<E extends boolean = false>(
    queueName: string,
    options?: RemoveSidekiqQueueOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SidekiqQueueStatus, C, E, void>> {
    return RequestHelper.get<SidekiqQueueStatus>()(
      this,
      endpoint`admin/sidekiq/queues/${queueName}`,
      options,
    );
  }
}
