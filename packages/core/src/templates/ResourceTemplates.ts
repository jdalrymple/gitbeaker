import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface TemplateSchema extends Record<string, unknown> {
  name: string;
  content: string;
}

export class ResourceTemplates<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: ['templates', resourceType].join('/'), ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<TemplateSchema[]>()(this, '', options);
  }

  show(key: string | number, options?: Sudo) {
    return RequestHelper.get<TemplateSchema>()(this, encodeURIComponent(key), options);
  }
}
