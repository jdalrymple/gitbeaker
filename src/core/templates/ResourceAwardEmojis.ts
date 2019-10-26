import {
  BaseService,
  BaseServiceOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ProjectId, ResourceId, NoteId, AwardId } from '..';

function url(projectId, resourceType, resourceId, awardId, noteId) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);
  const output = [pId, resourceType, rId];

  if (noteId) output.push('notes', encodeURIComponent(noteId));

  output.push(encodeURIComponent('award_emoji'));

  if (awardId) output.push(encodeURIComponent(awardId));

  return output.join('/');
}

export class ResourceAwardEmojis extends BaseService {
  protected resourceType: string;

  constructor(resourceType: string, options: BaseServiceOptions) {
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
