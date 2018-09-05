import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

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
  protected resourceType: temporaryAny;

  constructor(resourceType, baseParams: BaseModelContructorOptions) {
    super(baseParams);

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
