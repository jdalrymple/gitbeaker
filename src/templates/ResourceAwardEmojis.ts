import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
  ProjectId,
  ResourceId,
  ResourceType,
  NoteId,
  AwardId,
} from '@typings';

function url(projectId, resourceType, resourceId, awardId, noteId) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);
  const output = [pId, resourceType, rId];

  if (noteId) output.push('notes', encodeURIComponent(noteId));

  output.push(encodeURIComponent('award_emoji'));

  if (awardId) output.push(encodeURIComponent(awardId));

  return output.join('/');
}

class ResourceAwardsEmojis extends BaseService {
  protected resourceType: string;

  constructor(resourceType: ResourceType, options: BaseServiceOptions) {
    super({ url: 'projects', ...options });

    this.resourceType = resourceType;
  }

  all(
    projectId: ProjectId,
    resourceId: ResourceId,
    noteId: NoteId,
    options?: PaginatedRequestOptions,
  ) {
    return RequestHelper.get(
      this,
      url(projectId, this.resourceType, resourceId, null, noteId),
      options,
    );
  }

  award(
    projectId: ProjectId,
    resourceId: ResourceId,
    name: string,
    noteId: NoteId,
    options?: Sudo,
  ) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, null, noteId), {
      name,
      ...options,
    });
  }

  remove(
    projectId: ProjectId,
    resourceId: ResourceId,
    awardId: AwardId,
    noteId: NoteId,
    options?: Sudo,
  ) {
    return RequestHelper.del(
      this,
      url(projectId, this.resourceType, resourceId, awardId, noteId),
      options,
    );
  }

  show(
    projectId: ProjectId,
    resourceId: ResourceId,
    awardId: AwardId,
    noteId: NoteId,
    options?: Sudo,
  ) {
    return RequestHelper.get(
      this,
      url(projectId, this.resourceType, resourceId, awardId, noteId),
      options,
    );
  }
}

export default ResourceAwardsEmojis;
