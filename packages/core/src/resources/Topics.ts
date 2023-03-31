import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface TopicSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  total_projects_count: number;
  avatar_url: string;
}

export class Topics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { search?: string } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<TopicSchema[], C, E, P>> {
    return RequestHelper.get<TopicSchema[]>()(this, 'topics', options);
  }

  create<E extends boolean = false>(
    name: string,
    {
      avatar,
      ...options
    }: { avatar?: { content: Blob; filename: string }; description?: string } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const opts: Record<string, unknown> = {
      name,
      ...options,
    };

    if (avatar) {
      opts.isForm = true;
      opts.file = [avatar.content, avatar.filename];
    }

    return RequestHelper.post<TopicSchema>()(this, 'topics', opts);
  }

  edit<E extends boolean = false>(
    topicId: number,
    {
      avatar,
      ...options
    }: {
      name?: string;
      avatar?: { content: Blob; filename: string };
      description?: string;
    } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const opts: Record<string, unknown> = { ...options };

    if (avatar) {
      opts.isForm = true;
      opts.file = [avatar.content, avatar.filename];
    }

    return RequestHelper.put<TopicSchema>()(this, `topics/${topicId}`, opts);
  }

  merge<E extends boolean = false>(
    sourceTopicId: number,
    targetTopicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    return RequestHelper.post<TopicSchema>()(this, `topics/merge`, {
      sourceTopicId,
      targetTopicId,
      ...options,
    });
  }

  remove<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `topics/${topicId}`, options);
  }

  show<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    return RequestHelper.get<TopicSchema>()(this, `topics/${topicId}`, options);
  }
}
