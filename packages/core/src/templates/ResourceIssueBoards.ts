import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { MilestoneSchema } from './ResourceMilestones';
import { LabelSchema } from './ResourceLabels';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

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

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<IssueBoardSchema[]>()(this, endpoint`${resourceId}/boards`, options);
  }

  create(resourceId: string | number, name: string, options?: Sudo) {
    return RequestHelper.post<IssueBoardSchema>()(this, endpoint`${resourceId}/boards`, {
      name,
      ...options,
    });
  }

  createList(
    resourceId: string | number,
    boardId: number,
    labelId: number | string,
    options?: Sudo,
  ) {
    return RequestHelper.post<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      {
        labelId,
        ...options,
      },
    );
  }

  edit(resourceId: string | number, boardId: number, options?: BaseRequestOptions) {
    return RequestHelper.put()(this, endpoint`${resourceId}/boards/${boardId}`, options);
  }

  editList(
    resourceId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  ) {
    return RequestHelper.put<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      {
        position,
        ...options,
      },
    );
  }

  lists(resourceId: string | number, boardId: number, options?: Sudo) {
    return RequestHelper.get<IssueBoardListSchema[]>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists`,
      options,
    );
  }

  remove(resourceId: string | number, boardId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`${resourceId}/boards/${boardId}`, options);
  }

  removeList(resourceId: string | number, boardId: number, listId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      options,
    );
  }

  show(resourceId: string | number, boardId: number, options?: Sudo) {
    return RequestHelper.get<IssueBoardSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}`,
      options,
    );
  }

  showList(resourceId: string | number, boardId: number, listId: number, options?: Sudo) {
    return RequestHelper.get<IssueBoardListSchema>()(
      this,
      endpoint`${resourceId}/boards/${boardId}/lists/${listId}`,
      options,
    );
  }
}
