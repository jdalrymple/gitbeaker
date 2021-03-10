import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';
import {
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface LicenceTemplateSchema extends Record<string, unknown> {
  key: string;
  name: string;
  nickname?: null;
  featured: boolean;
  html_url: string;
  source_url: string;
  description: string;
  conditions?: string[];
  permissions?: string[];
  limitations?: string[];
  content: string;
}

export interface LicenceTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  all(options?: PaginatedRequestOptions): Promise<CamelizedRecord<C,LicenceTemplateSchema>[]>
  show(key: string | number, options?: Sudo): Promise<CamelizedRecord<C,LicenceTemplateSchema>>
}

export class LicenceTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('licences', options);
  }
}
