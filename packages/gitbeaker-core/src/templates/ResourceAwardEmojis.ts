import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { AwardEmojiSchema } from '../models';

export function url(
  projectId: number | string,
  resourceType: string,
  resourceId: number | string,
  awardId?: number | null,
  noteId?: number,
) {
  const [pId, rId] = [projectId, resourceId].map(encodeURIComponent);
  const output = [pId, resourceType, rId];

  if (noteId) output.push('notes', encodeURIComponent(noteId));

  output.push('award_emoji');

  if (awardId) output.push(encodeURIComponent(awardId));

  return output.join('/');
}

export class ResourceAwardEmojis<C extends boolean = false> extends BaseService<C> {
  protected resourceType: string;

  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: 'projects', ...options });

    this.resourceType = resourceType;
  }

  all(projectId: string | number, resourceIId: number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<AwardEmojiSchema[]>()(
      this,
      url(projectId, this.resourceType, resourceIId),
      options,
    );
  }

  award(projectId: string | number, resourceIId: number, name: string, options?: Sudo) {
    return RequestHelper.post<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId),
      {
        name,
        ...options,
      },
    );
  }

  remove(projectId: string | number, resourceIId: number, awardId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      url(projectId, this.resourceType, resourceIId, awardId),
      options,
    );
  }

  show(projectId: string | number, resourceIId: number, awardId: number, options?: Sudo) {
    return RequestHelper.get<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId, awardId),
      options,
    );
  }
}
