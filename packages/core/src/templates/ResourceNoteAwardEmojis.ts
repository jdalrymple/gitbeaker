import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AwardEmojiSchema } from './ResourceAwardEmojis';

function url(
  resourceId: number | string,
  resourceType2: string,
  resourceId2: number | string,
  noteId: number,
  awardId?: number,
) {
  const [rId, rId2] = [resourceId, resourceId2].map(encodeURIComponent);
  const output: (string | number)[] = [rId, resourceType2, rId2];

  output.push('notes');
  output.push(noteId);
  output.push('award_emoji');

  if (awardId) output.push(awardId);

  return output.join('/');
}

export class ResourceNoteAwardEmojis<C extends boolean = false> extends BaseResource<C> {
  protected resourceType: string;

  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: 'projects', ...options });

    this.resourceType = resourceType;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>> {
    return RequestHelper.get<AwardEmojiSchema[]>()(
      this,
      url(projectId, this.resourceType, resourceIId, noteId),
      options,
    );
  }

  award<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    return RequestHelper.post<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId, noteId),
      {
        name,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      url(projectId, this.resourceType, resourceIId, noteId, awardId),
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    return RequestHelper.get<AwardEmojiSchema>()(
      this,
      url(projectId, this.resourceType, resourceIId, noteId, awardId),
      options,
    );
  }
}
