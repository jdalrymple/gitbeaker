import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  BaseRequestOptions,
  PaginatedRequestOptions,
  ResourceId,
  ResourceType,
  KeyId,
} from '@src/types';

class ResourceVariables extends BaseService {
  protected resourceType: ResourceType;

  constructor(resourceType: ResourceType, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.resourceType = resourceType;
  }

  all(resourceId: ResourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/variables`);
  }

  create(resourceId: ResourceId, options: RequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${this.resourceType}/${rId}/variables`, options);
  }

  edit(resourceId: ResourceId, keyId: string, options: RequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `${this.resourceType}/${rId}/variables/${kId}`, options);
  }

  show(resourceId: ResourceId, keyId: string) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/variables/${kId}`);
  }

  remove(resourceId: ResourceId, keyId: string) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${this.resourceType}/${rId}/variables/${kId}`);
  }
}

export default ResourceVariables;
