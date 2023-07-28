import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { MilestoneSchema } from './ResourceMilestones';
import { LabelSchema } from './ResourceLabels';

export interface IssueBoardListSchema extends Record<string, unknown> {
  id: number;
  label: Pick<LabelSchema, 'name' | 'color' | 'description'>;
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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardSchema[], C, E, P>> {
    return RequestHelper.get<IssueBoardSchema[]>()(this, endpoint`${resourceId}/boards`, options);
  }

  allLists<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema[], C, E, void>> {
    return RequestHelper.get<IssueBoardListSchema[]>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      options,
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    return RequestHelper.post<IssueBoardSchema>()(this, endpoint`${resourceId}/boards`, {
      name,
      ...options,
    });
  }

  createList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: OneOrNoneOf<{ labelId: number; assigneeId: number; milestoneId: number }> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    return RequestHelper.post<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      options,
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
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    return RequestHelper.put<IssueBoardSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}`,
      options,
    );
  }

  editList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    return RequestHelper.put<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      {
        position,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/boards/${boardId}`, options);
  }

  removeList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardSchema, C, E, void>> {
    return RequestHelper.get<IssueBoardSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}`,
      options,
    );
  }

  showList<E extends boolean = false>(
    resourceId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>> {
    return RequestHelper.get<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      options,
    );
  }
}
