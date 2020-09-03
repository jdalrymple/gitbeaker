import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  ShowExpanded,
} from '../infrastructure';

export class ResourceLabels extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions & ShowExpanded) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions & ShowExpanded) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/labels`, options);
  }

  create(
    resourceId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions & ShowExpanded,
  ) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit(
    resourceId: string | number,
    labelName: string,
    options?: BaseRequestOptions & ShowExpanded,
  ) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.put(this, `${rId}/labels`, { name: labelName, ...options });
  }

  remove(resourceId: string | number, labelName: string, options?: Sudo & ShowExpanded) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.del(this, `${rId}/labels`, { name: labelName, ...options });
  }

  subscribe(resourceId: string | number, labelId: number, options?: Sudo & ShowExpanded) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(resourceId: string | number, labelId: number, options?: Sudo & ShowExpanded) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/issues/${lId}/unsubscribe`, options);
  }
}
