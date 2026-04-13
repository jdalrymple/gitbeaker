import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import { LabelSchema } from './ResourceLabels';
import { MilestoneSchema } from './ResourceMilestones';

export interface IssueBoardListSchema extends Record<string, unknown> {
  id: number;
  label: Pick<LabelSchema, 'id' | 'name' | 'color' | 'description'>;
  position: number;
  max_issue_count: number;
  max_issue_weight: number;
  limit_metric?: string;
}

export interface IssueBoardSchema extends Record<string, unknown> {
  id: number;
  name: string;
  milestone: Pick<MilestoneSchema, 'id' | 'title'>;
  lists?: IssueBoardListSchema[];
}

export class ResourceIssueBoards<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<IssueBoardSchema[]>()(this, endpoint`${resourceId}/boards`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  allLists<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueBoardListSchema[]>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueBoardSchema>()(this, endpoint`${resourceId}/boards`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
      },
    });
  }

  createList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: OneOrNoneOf<{ labelId: number; assigneeId: number; milestoneId: number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: {
      name?: string;
      assigneeId?: number;
      milestoneId?: number;
      labels?: string;
      weight?: number;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<IssueBoardSchema>()(this, endpoint`${resourceId}/boards/${boardId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  editList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          position,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/boards/${boardId}`, {
      sudo,
      showExpanded,
    });
  }

  removeList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/boards/${boardId}/lists/${listId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueBoardSchema>()(this, endpoint`${resourceId}/boards/${boardId}`, {
      sudo,
      showExpanded,
    });
  }

  showList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
