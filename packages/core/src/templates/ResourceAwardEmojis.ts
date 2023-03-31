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
import type { UserSchema } from '../resources/Users';

export interface AwardEmojiSchema extends Record<string, unknown> {
  id: number;
  name: string;
  user: UserSchema;
  created_at: string;
  updated_at: string;
  awardable_id: number;
  awardable_type: string;
}

function url(
  resourceId: number | string,
  resourceType2: string,
  resourceId2: number | string,
  awardId?: number,
) {
  const [rId, rId2] = [resourceId, resourceId2].map(encodeURIComponent);
  const output: (string | number)[] = [rId, resourceType2, rId2];

  output.push('award_emoji');

  if (awardId) output.push(awardId);

  return output.join('/');
}

export class ResourceAwardEmojis<C extends boolean = false> extends BaseResource<C> {
  protected resourceType2: string;

  constructor(resourceType1: string, resourceType2: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType1, ...options });

    this.resourceType2 = resourceType2;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resourceIId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>> {
    return RequestHelper.get<AwardEmojiSchema[]>()(
      this,
      url(resourceId, this.resourceType2, resourceIId),
      options,
    );
  }

  award<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    return RequestHelper.post<AwardEmojiSchema>()(
      this,
      url(resourceId, this.resourceType2, resourceIId),
      {
        name,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      url(resourceId, this.resourceType2, resourceIId, awardId),
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    return RequestHelper.get<AwardEmojiSchema>()(
      this,
      url(resourceId, this.resourceType2, resourceIId, awardId),
      options,
    );
  }
}
