import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';
import { PaginatedRequestOptions, Sudo, CamelizedRecord } from '../infrastructure';

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
  all(options?: PaginatedRequestOptions): Promise<CamelizedRecord<C, LicenseTemplateSchema>[]>;
  show(key: string | number, options?: Sudo): Promise<CamelizedRecord<C, LicenseTemplateSchema>>;
}

export class LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('Licenses', options);
  }
}
