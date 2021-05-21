import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

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

export interface LicenseTemplates extends ResourceTemplates {
  all(options?: PaginatedRequestOptions): Promise<LicenseTemplateSchema[]>;
  show(key: string | number, options?: Sudo): Promise<LicenseTemplateSchema>;
}

export class LicenseTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('Licenses', options);
  }
}
