import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

function url(
  projectId: ProjectId,
  resourceType: ResourceType,
  resourceId: ResourceId,
  noteId: NoteId,
) {
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

  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, 'projects');
    this.resourceType = resourceType;
  }

  all(projectId: ProjectId, resourceId: ResourceId, options: RequestOptions, noteId: NoteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId), options);
  }

  award(projectId: ProjectId, resourceId: ResourceId, name: string, noteId: NoteId) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, noteId), {
      name,
    });
  }

  remove(projectId: ProjectId, resourceId: ResourceId, awardId: string | number, noteId: NoteId) {
    return RequestHelper.delete(this, url(projectId, this.resourceType, resourceId, noteId));
  }

  show(projectId: ProjectId, resourceId: ResourceId, awardId: string | number, noteId: NoteId) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId));
  }
}

export default ResourceAwardsEmojis;
