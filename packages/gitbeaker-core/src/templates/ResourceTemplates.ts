import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export class ResourceTemplates extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ prefixUrl: ['templates', resourceType].join('/'), ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, '', options);
  }

  show(resourceId: string | number, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}`, options);
  }
}
