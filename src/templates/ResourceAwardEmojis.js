import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

function url(projectId, resourceType, resourceId, noteId) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);

  if (noteId) {
    return `${pId}/${resourceType}/${rId}/notes/${encodeURIComponent(noteId)}/award_emoji`;
  }

  return `${pId}/${resourceType}/${rId}/award_emoji`;
}

class ResourceAwardsEmojis extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, 'projects');
    this.resourceType = resourceType;
  }

  all(projectId, resourceId, options, noteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId), options);
  }

  award(projectId, resourceId, name, noteId) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, noteId), {
      name,
    });
  }

  remove(projectId, resourceId, awardId, noteId) {
    return RequestHelper.delete(this, url(projectId, this.resourceType, resourceId, noteId));
  }

  show(projectId, resourceId, awardId, noteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId));
  }
}

export default ResourceAwardsEmojis;
