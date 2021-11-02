import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo, endpoint } from '../infrastructure';

export interface NamespaceSchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id?: number;
  avatar_url: string;
  web_url: string;
  billable_members_count: number;
  plan: string;
  trial_ends_on?: string;
  trial: boolean;
}

// TODO: Add missing functions
export class Namespaces<C extends boolean = false> extends BaseResource<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<NamespaceSchema[]>()(this, 'namespaces', options);
  }

  show(namespaceId: string | number, options?: { search?: string } & Sudo) {
    return RequestHelper.get<NamespaceSchema>()(this, endpoint`namespaces/${namespaceId}`, options);
  }
}
