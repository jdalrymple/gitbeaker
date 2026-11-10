import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface VirtualRegistryCleanupPolicySchema extends Record<string, unknown> {
  group_id: number;
  next_run_at: string | null;
  last_run_at: string | null;
  last_run_deleted_size: number;
  last_run_deleted_entries_count: number;
  keep_n_days_after_download: number;
  status: string;
  cadence: number;
  enabled: boolean;
  notify_on_success: boolean;
  notify_on_failure: boolean;
  failure_message: string | null;
  last_run_detailed_metrics: Record<
    string,
    {
      deleted_entries_count: number;
      deleted_size: number;
    }
  >;
  created_at: string;
  updated_at: string;
}

export type VirtualRegistryCleanupPolicyOptions = {
  cadence?: 1 | 7 | 14 | 30 | 90;
  enabled?: boolean;
  keep_n_days_after_download?: number;
  notify_on_success?: boolean;
  notify_on_failure?: boolean;
};

export class VirtualRegistriesCleanupPolicies<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VirtualRegistryCleanupPolicySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<VirtualRegistryCleanupPolicySchema>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/cleanup/policy`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo & VirtualRegistryCleanupPolicyOptions,
  ): Promise<GitlabAPIResponse<VirtualRegistryCleanupPolicySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<VirtualRegistryCleanupPolicySchema>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/cleanup/policy`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo & VirtualRegistryCleanupPolicyOptions,
  ): Promise<GitlabAPIResponse<VirtualRegistryCleanupPolicySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<VirtualRegistryCleanupPolicySchema>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/cleanup/policy`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/cleanup/policy`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
