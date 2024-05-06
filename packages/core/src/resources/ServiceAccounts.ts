import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema, C, E, void>> {
    return RequestHelper.post<ServiceAccountSchema>()(this, endpoint`service_accounts`, options);
  }
}
