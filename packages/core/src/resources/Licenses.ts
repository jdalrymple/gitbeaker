import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface LicenseTemplateSchema extends Record<string, unknown> {
  key: string;
  name: string;
  nickname: string | null;
  featured: boolean;
  html_url: string;
  source_url: string;
  description: string;
  conditions: string[];
  permissions: string[];
  limitations: string[];
  content: string;
}

export class Licenses<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: { popular?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<LicenseTemplateSchema[]>()(this, 'templates/licenses', {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  show<E extends boolean = false>(
    key: string,
    options?: {
      project?: string;
      fullname?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<LicenseTemplateSchema>()(this, endpoint`templates/licenses/${key}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
