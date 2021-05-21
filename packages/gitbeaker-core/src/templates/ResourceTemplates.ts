import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { ResourceTemplateSchema } from '../models';

export class ResourceTemplates<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: ['templates', resourceType].join('/'), ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<ResourceTemplateSchema[]>()(this, '', options);
  }

  show(key: string | number, options?: Sudo) {
    const rId = encodeURIComponent(key);

    return RequestHelper.get<ResourceTemplateSchema>()(this, `${rId}`, options);
  }
}
