import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

const url = (projectId, resourceId, noteId) => {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);

  if (noteId) {
    return `${pId}/${this.resourceId}/${rId}/notes/${encodeURIComponent(noteId)}/award_emoji`;
  }

  return `${pId}/${this.resourceId}/${rId}/award_emoji`;
};

class ResourceAwardsEmojis extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, 'projects');
    this.resourceType = resourceType;
  }

  all(projectId, resourceId, options, noteId) {
    return RequestHelper.get(this, url(projectId, resourceId, noteId), options);
  }

  create(projectId, resourceId, name, noteId) {
    return RequestHelper.post(this, url(projectId, resourceId, noteId), { name });
  }

  remove(projectId, resourceId, awardId, noteId) {
    return RequestHelper.delete(this, url(projectId, resourceId, noteId));
  }

  show(projectId, resourceId, awardId, noteId) {
    return RequestHelper.get(this, url(projectId, resourceId, noteId));
  }
}

export default ResourceAwardsEmojis;
