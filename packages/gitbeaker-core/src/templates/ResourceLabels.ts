import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  ShowExpanded,
} from '../infrastructure';
import { LabelSchema } from '../models';

export class ResourceLabels<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<LabelSchema[]>()(this, `${rId}/labels`, options);
  }

  create(
    resourceId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  ) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<LabelSchema>()(this, `${rId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit(resourceId: string | number, labelId: number | string, options?: BaseRequestOptions) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.put<LabelSchema>()(this, `${rId}/labels/${lId}`, options);
  }

  remove(resourceId: string | number, labelId: number | string, options?: Sudo & ShowExpanded) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/labels/${lId}`, options);
  }

  subscribe(resourceId: string | number, labelId: number | string, options?: Sudo & ShowExpanded) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.post<LabelSchema>()(this, `${rId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(
    resourceId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded,
  ) {
    const [rId, lId] = [resourceId, labelId].map(encodeURIComponent);

    return RequestHelper.post<LabelSchema>()(this, `${rId}/issues/${lId}/unsubscribe`, options);
  }
}
