import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ResourceId,
  ResourceType,
  LabelId,
} from '@src/types';

class ResourceIssueBoards extends BaseService {
  constructor(resourceType: ResourceType, options) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/boards`, options);
  }

  create(resourceId: ResourceId, name: string, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/boards`, { name, ...options });
  }

  createList(resourceId: ResourceId, boardId: number, labelId: LabelId, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/boards/${bId}/lists`, { labelId, ...options });
  }

  edit(resourceId: ResourceId, boardId: number, options?: BaseRequestOptions) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}`, options);
  }

  editList(
    resourceId: ResourceId,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  ) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}/lists/${lId}`, { position, ...options });
  }

  lists(resourceId: ResourceId, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists`, options);
  }

  remove(resourceId: ResourceId, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}`, options);
  }

  removeList(resourceId: ResourceId, boardId: number, listId: number, options?: Sudo) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}/lists/${lId}`, options);
  }

  show(resourceId: ResourceId, boardId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}`, options);
  }

  showList(resourceId: ResourceId, boardId: number, listId: number, options?: Sudo) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists/${lId}`, options);
  }
}

export default ResourceIssueBoards;
