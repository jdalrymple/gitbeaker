import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  Sudo,
} from '../infrastructure';

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
    options?: { popular?: boolean } & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema[], C, E, P>>;

  show<E extends boolean = false>(
    key: string | number,
    options?: { project?: string; fullName?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LicenseTemplateSchema, C, E, void>>;
}

export class LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('Licenses', options);
  }
}
