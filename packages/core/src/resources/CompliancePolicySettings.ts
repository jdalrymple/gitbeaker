import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface CompliancePolicySettingsSchema extends Record<string, unknown> {
  csp_namespace_id: number | null;
}

export class CompliancePolicySettings<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CompliancePolicySettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CompliancePolicySettingsSchema>()(this, 'admin/security/compliance_policy_settings', {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    cspNamespaceId: number | null,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CompliancePolicySettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<CompliancePolicySettingsSchema>()(this, 'admin/security/compliance_policy_settings', {
      sudo,
      showExpanded,
      body: {
        cspNamespaceId,
      },
    });
  }
}