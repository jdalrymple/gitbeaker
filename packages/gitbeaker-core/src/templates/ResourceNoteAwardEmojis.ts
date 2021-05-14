import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { AwardEmojiSchema, url } from './ResourceAwardEmojis';

export class ResourceNoteAwardEmojis<C extends boolean = false> extends BaseService<C> {
  protected resourceType: string;

  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: 'projects', ...options });

    this.resourceType = resourceType;
  }

  all(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    options?: PaginatedRequestOptions,
  ) {
    return RequestHelper.get<AwardEmojiSchema[]>()(
      this,
      url(projectId, this.resourceType, resourceIId, null, noteId),
      options,
    );
  }

  award(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    name: string,
    options?: Sudo,
  ) {
    return RequestHelper.post<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId, null, noteId),
      {
        name,
        ...options,
      },
    );
  }

  remove(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ) {
    return RequestHelper.del()(
      this,
      url(projectId, this.resourceType, resourceIId, awardId, noteId),
      options,
    );
  }

  show(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ) {
    return RequestHelper.get<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId, awardId, noteId),
      options,
    );
  }
}
