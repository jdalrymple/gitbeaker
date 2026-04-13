import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export interface ServiceAccountSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
}

export class ServiceAccounts<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    options?: {
      name?: string;
      username?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ServiceAccountSchema>()(this, 'service_accounts', {
      sudo,
      showExpanded,
      body,
    });
  }
}
