import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ResourceTemplateSchema extends Record<string, unknown> {
  name: string;
  content: string;
}

export class ResourceTemplates extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
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
