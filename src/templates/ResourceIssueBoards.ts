import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

class ResourceIssueBoards extends BaseService {
  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/boards`, options);
  }

  create(resourceId, name) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/boards`, { name });
  }

  createList(resourceId, boardId, labelId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/boards/${bId}/lists`, { labelId });
  }

  edit(resourceId, boardId, options) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}`, options);
  }

  editList(resourceId, boardId, listId, position) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}/lists/${lId}`, { position });
  }

  lists(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists`);
  }

  remove(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}`);
  }

  removeList(resourceId, boardId, listId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}/lists/${lId}`);
  }

  show(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}`);
  }

  showList(resourceId, boardId, listId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists/${lId}`);
  }
}

export default ResourceIssueBoards;
