import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface ProjectSecuritySettingsSchema extends Record<string, unknown> {
  project_id: number;
  created_at: string;
  updated_at: string;
  auto_fix_container_scanning: boolean;
  auto_fix_dast: boolean;
  auto_fix_dependency_scanning: boolean;
  auto_fix_sast: boolean;
  continuous_vulnerability_scans_enabled: boolean;
  container_scanning_for_registry_enabled: boolean;
  secret_push_protection_enabled: boolean;
}

export class ProjectSecuritySettings<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSecuritySettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProjectSecuritySettingsSchema>()(
      this,
      endpoint`projects/${projectId}/security_settings`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: {
      secretPushProtectionEnabled?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSecuritySettingsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ProjectSecuritySettingsSchema>()(
      this,
      endpoint`projects/${projectId}/security_settings`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}
