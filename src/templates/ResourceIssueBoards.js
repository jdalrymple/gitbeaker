import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceIssueBoards extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  @api('<resourceId>', { options: true, method: 'GET' })
  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/boards`, options);
  }

  @api('<resourceId>', '<name>', { method: 'POST' })
  create(resourceId, name) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/boards`, { name });
  }

  @api('<resourceId>', '<boardId>', '<labelId>', { method: 'POST' })
  createList(resourceId, boardId, labelId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/boards/${bId}/lists`, { labelId });
  }

  @api('<resourceId>', '<boardId>', { options: true, method: 'PUT' })
  edit(resourceId, boardId, options) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}`, options);
  }

  @api('<resourceId>', '<boardId>', '<listId>', '<position>', { method: 'PUT' })
  editList(resourceId, boardId, listId, position) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/boards/${bId}/lists/${lId}`, { position });
  }

  @api('<resourceId>', '<boardId>', { method: 'GET' })
  lists(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists`);
  }

  @api('<resourceId>', '<boardId>', { method: 'DELETE' })
  remove(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}`);
  }

  @api('<resourceId>', '<boardId>', '<listId>', { method: 'DELETE' })
  removeList(resourceId, boardId, listId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/boards/${bId}/lists/${lId}`);
  }

  @api('<resourceId>', '<boardId>', { method: 'GET' })
  show(resourceId, boardId) {
    const [rId, bId] = [resourceId, boardId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}`);
  }

  @api('<resourceId>', '<boardId>', '<listId>', { method: 'GET' })
  showList(resourceId, boardId, listId) {
    const [rId, bId, lId] = [resourceId, boardId, listId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/boards/${bId}/lists/${lId}`);
  }
}

export default ResourceIssueBoards;
