import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type BoardId = string | number;
export type ListId = string | number;
export type LabelId = string | number;
/** The position of the list */
export type Position = string | number;
class ResourceIssueBoards extends BaseService {
  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId: ResourceId, options: RequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/boards`, options);
  }

  create(resourceId: ResourceId, name: string) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/boards`, { name });
  }

  createList(resourceId: ResourceId, boardId: BoardId, labelId: LabelId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/boards/${bId}/lists`, { labelId });
  }

  edit(resourceId: ResourceId, boardId: BoardId, options: RequestOptions) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}`, options);
  }

  editList(resourceId: ResourceId, boardId: BoardId, listId: ListId, position: Position) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}/lists/${lId}`, { position });
  }

  lists(resourceId: ResourceId, boardId: BoardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists`);
  }

  remove(resourceId: ResourceId, boardId: BoardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}`);
  }

  removeList(resourceId: ResourceId, boardId: BoardId, listId: ListId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}/lists/${lId}`);
  }

  show(resourceId: ResourceId, boardId: BoardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}`);
  }

  showList(resourceId: ResourceId, boardId: BoardId, listId: ListId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists/${lId}`);
  }
}

export default ResourceIssueBoards;
