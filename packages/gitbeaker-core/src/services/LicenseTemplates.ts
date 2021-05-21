import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';
import { PaginatedRequestOptions, Sudo, CamelizedRecord } from '../infrastructure';
import { LicenseTemplateSchema } from '../models';

export interface LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  all(options?: PaginatedRequestOptions): Promise<CamelizedRecord<C, LicenseTemplateSchema>[]>;
  show(key: string | number, options?: Sudo): Promise<CamelizedRecord<C, LicenseTemplateSchema>>;
}

export class LicenseTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('Licenses', options);
  }
}
