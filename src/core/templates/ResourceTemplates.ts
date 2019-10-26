import {
  BaseService,
  RequestHelper,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';
import { ResourceId } from '..';

export class ResourceTemplates extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
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
