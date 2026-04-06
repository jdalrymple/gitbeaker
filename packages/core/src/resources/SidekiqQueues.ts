import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: RemoveSidekiqQueueOptions & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SidekiqQueueStatus, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<SidekiqQueueStatus>()(
      this,
      endpoint`admin/sidekiq/queues/${queueName}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }
}
