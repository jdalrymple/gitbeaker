import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ErrorTrackingSettingsSchema extends Record<string, unknown> {
  active: boolean;
  project_name: string;
  sentry_external_url: string;
  api_url: string;
  integrated: boolean;
}

export class ErrorTrackingSettings<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    active: boolean,
    integrated: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ErrorTrackingSettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<ErrorTrackingSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/error_tracking/settings`,
      {
        sudo,
        showExpanded,
        searchParams: {
          active,
          integrated,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    active: boolean,
    options?: { integrated?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ErrorTrackingSettingsSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.patch<ErrorTrackingSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/error_tracking/settings`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          active,
        },
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ErrorTrackingSettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ErrorTrackingSettingsSchema>()(
      this,
      endpoint`projects/${projectId}/error_tracking/settings`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
