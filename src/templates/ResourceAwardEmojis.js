import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

function url(projectId, resourceType, resourceId, noteId) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);
  let output = `${pId}/${resourceType}/${rId}/`;

  if (noteId) {
    output += `notes/${encodeURIComponent(noteId)}/`;
  }

  output += 'award_emoji';

  return output;
}

class ResourceAwardsEmojis extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, 'projects');
    this.resourceType = resourceType;
  }

  @api('<projectId>', '<resourceId>', '<noteId>', { options: true, method: 'GET' })
  all(projectId, resourceId, noteId, options) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId), options);
  }

  @api('<projectId>', '<resourceId>', '<name>', '<noteId>', { method: 'POST' })
  award(projectId, resourceId, name, noteId) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, noteId), {
      name,
    });
  }

  @api('<projectId>', '<resourceId>', '<awardId>', '<noteId>', { method: 'DELETE' })
  remove(projectId, resourceId, awardId, noteId) {
    return RequestHelper.delete(this, url(projectId, this.resourceType, resourceId, noteId));
  }

  @api('<projectId>', '<resourceId>', '<awardId>', '<noteId>', { method: 'GET' })
  show(projectId, resourceId, awardId, noteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId));
  }
}

export default ResourceAwardsEmojis;
