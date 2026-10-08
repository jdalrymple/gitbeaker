import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface GroupSecuritySettingsUpdateResponse extends Record<string, unknown> {
  secret_push_protection_enabled: boolean;
  errors: string[];
}

export class GroupSecuritySettings<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>(
    groupId: string | number,
    secretPushProtectionEnabled: boolean,
    options?: { projectsToExclude?: number[] } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupSecuritySettingsUpdateResponse, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<GroupSecuritySettingsUpdateResponse>()(
      this,
      endpoint`groups/${groupId}/security_settings`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          secretPushProtectionEnabled,
        },
      },
    );
  }
}
