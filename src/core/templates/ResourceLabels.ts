import {
  BaseRequestOptions,
  BaseService,
  BaseServiceOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ResourceId, LabelId } from '../services';

class ResourceLabels extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/labels`, options);
  }

  create(resourceId: ResourceId, labelName: string, color: string, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit(resourceId: ResourceId, labelName: string, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.put(this, `${rId}/labels`, { name: labelName, ...options });
  }

  remove(resourceId: ResourceId, labelName: string, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.del(this, `${rId}/labels`, { name: labelName, ...options });
  }

  subscribe(resourceId: ResourceId, labelId: LabelId, options?: Sudo) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(resourceId: ResourceId, labelId: LabelId, options?: Sudo) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/issues/${lId}/unsubscribe`, options);
  }
}

export default ResourceLabels;
