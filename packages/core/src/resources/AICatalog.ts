import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';


export class AICatalog<C extends boolean = false> extends BaseResource<C> {
  seedExternalAgents<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      'admin/ai_catalog/seed_external_agents',
      {
        sudo,
        showExpanded,
      },
    );
  }
}