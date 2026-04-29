import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { ResourceTemplates } from '../templates';

export interface LicenseTemplateSchema extends Record<string, unknown> {
  key: string;
  name: string;
  nickname?: string;
  featured: boolean;
  html_url: string;
  source_url: string;
  description: string;
  conditions?: string[];
  permissions?: string[];
  limitations?: string[];
  content: string;
}

export interface LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { popular?: boolean } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema[], C, E, P>>;

  show<E extends boolean = false>(
    key: string | number,
    options?: { project?: string; fullName?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema, C, E, void>>;
}

export class LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('Licenses', options);
  }
}
