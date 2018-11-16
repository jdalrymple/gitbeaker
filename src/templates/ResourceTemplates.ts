import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
  ResourceId,
  ResourceType,
} from '@typings';

class ResourceTemplates extends BaseService {
  constructor(resourceType: ResourceType, options: BaseServiceOptions) {
    super({ url: ['templates', resourceType].join('/'), ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, '', options);
  }

  show(resourceId: ResourceId, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}`, options);
  }
}

export default ResourceTemplates;
