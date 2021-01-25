import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export class ResourceNotes<C extends boolean> extends BaseService<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, {
      body,
      ...options,
    });
  }

  edit(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, {
      body,
      ...options,
    });
  }

  remove(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    options?: Sudo,
  ) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  show(resourceId: string | number, resource2Id: string | number, noteId: number, options?: Sudo) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }
}
