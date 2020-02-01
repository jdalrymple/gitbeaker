import {
  BaseService,
  BaseServiceOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

function url(
  projectId: number | string,
  resourceType: string,
  resourceId: number | string,
  noteId: number,
  awardId?: number,
) {
  const [pId, rId, nId] = [projectId, resourceId, noteId].map(encodeURIComponent);
  const output = [pId, resourceType, rId, 'notes', nId, 'award_emoji'];

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
    projectId: string | number,
    resourceId: string | number,
    noteId: number,
    options?: PaginatedRequestOptions,
  ) {
    return RequestHelper.get(this, url(projectId, this.resourceType, resourceId, noteId), options);
  }

  award(
    projectId: string | number,
    resourceId: string | number,
    noteId: number,
    name: string,
    options?: Sudo,
  ) {
    return RequestHelper.post(this, url(projectId, this.resourceType, resourceId, noteId), {
      name,
      ...options,
    });
  }

  remove(
    projectId: string | number,
    resourceId: string | number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ) {
    return RequestHelper.del(
      this,
      url(projectId, this.resourceType, resourceId, noteId, awardId),
      options,
    );
  }

  show(
    projectId: string | number,
    resourceId: string | number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ) {
    return RequestHelper.get(
      this,
      url(projectId, this.resourceType, resourceId, noteId, awardId),
      options,
    );
  }
}
