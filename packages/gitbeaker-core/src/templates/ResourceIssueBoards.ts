import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class ResourceIssueBoards<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get()(this, `${rId}/boards`, options);
  }

  create(resourceId: string | number, name: string, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post()(this, `${rId}/boards`, { name, ...options });
  }

  createList(resourceId: string | number, boardId: number, labelId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.post()(this, `${rId}/boards/${bId}/lists`, { labelId, ...options });
  }

  edit(resourceId: string | number, boardId: number, options?: BaseRequestOptions) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.put()(this, `${rId}/boards/${bId}`, options);
  }

  editList(
    resourceId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  ) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.put()(this, `${rId}/boards/${bId}/lists/${lId}`, { position, ...options });
  }

  lists(resourceId: string | number, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/boards/${bId}/lists`, options);
  }

  remove(resourceId: string | number, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/boards/${bId}`, options);
  }

  removeList(resourceId: string | number, boardId: number, listId: number, options?: Sudo) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/boards/${bId}/lists/${lId}`, options);
  }

  show(resourceId: string | number, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/boards/${bId}`, options);
  }

  showList(resourceId: string | number, boardId: number, listId: number, options?: Sudo) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/boards/${bId}/lists/${lId}`, options);
  }
}
