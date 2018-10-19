import { BaseService, RequestHelper } from '../infrastructure';

function url(projectId, resourceType, resourceId, awardId, noteId) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);
  const output = [pId, resourceType, rId];

  if (noteId) output.push('notes', encodeURIComponent(noteId));

  output.push(encodeURIComponent('award_emoji'));

  if (awardId) output.push(encodeURIComponent(awardId));

  return output;
}

class ResourceAwardsEmojis extends BaseService {
  protected resourceType: temporaryAny;

  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = [this.url, 'projects'].join('/');
    this.resourceType = resourceType;
  }

  all(projectId, resourceId, noteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, null, noteId));
  }

  award(projectId, resourceId, name, noteId) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, null, noteId), {
      name,
    });
  }

  remove(projectId, resourceId, awardId, noteId) {
    return RequestHelper.delete(
      this,
      url(projectId, this.resourceType, resourceId, awardId, noteId),
    );
  }

  show(projectId, resourceId, awardId, noteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, awardId, noteId));
  }
}

export default ResourceAwardsEmojis;
