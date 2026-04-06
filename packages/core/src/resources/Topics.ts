import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  PaginationRequestSearchParams,
  RequestHelper,
  createFormData,
  endpoint,
} from '../infrastructure';
import type {
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
    options?: PaginationRequestOptions<P> &
      BaseRequestSearchParams & { search?: string; withoutProjects?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<TopicSchema[]>()(this, 'topics', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  create<E extends boolean = false>(
    name: string,
    {
      avatar,
      ...options
    }: { avatar?: { content: Blob; filename: string }; description?: string } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TopicSchema>()(this, 'topics', {
      sudo,
      showExpanded,
      body: avatar
        ? createFormData({
            ...body,
            name,
            avatar: [avatar.content, avatar.filename],
          })
        : body,
    });
  }

  edit<E extends boolean = false>(
    topicId: number,
    {
      avatar,
      ...options
    }: {
      name?: string;
      title?: string;
      avatar?: { content: Blob; filename: string };
      description?: string;
    } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<TopicSchema>()(this, endpoint`topics/${topicId}`, {
      sudo,
      showExpanded,
      body: avatar
        ? createFormData({
            ...body,
            avatar: [avatar.content, avatar.filename],
          })
        : body,
    });
  }

  merge<E extends boolean = false>(
    sourceTopicId: number,
    targetTopicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<TopicSchema>()(this, `topics/merge`, {
      sudo,
      showExpanded,
      body: {
        sourceTopicId,
        targetTopicId,
      },
    });
  }

  remove<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`topics/${topicId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TopicSchema>()(this, endpoint`topics/${topicId}`, {
      sudo,
      showExpanded,
    });
  }
}
