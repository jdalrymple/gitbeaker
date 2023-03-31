import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { TodoSchema } from './TodoLists';
import type { UserSchema } from './Users';
import type { GroupSchema } from './Groups';

export interface EpicSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  group_id: number;
  parent_id: number;
  parent_iid: number;
  title: string;
  description: string;
  state: string;
  confidential: string;
  web_url: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  author: Omit<UserSchema, 'created_at'>;
  start_date?: string;
  start_date_is_fixed: boolean;
  start_date_fixed?: string;
  start_date_from_inherited_source?: string;
  due_date: string;
  due_date_is_fixed: boolean;
  due_date_fixed?: string;
  due_date_from_inherited_source: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  labels?: string[];
  upvotes: number;
  downvotes: number;
  _links: {
    self: string;
    epic_issues: string;
    group: string;
  };
}

export interface EpicTodoSchema extends TodoSchema {
  group: Pick<GroupSchema, 'id' | 'name' | 'path' | 'kind' | 'full_path' | 'parent_id'>;
  target_type: 'Epic';
  target: EpicSchema;
}

export class Epics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<EpicSchema[], C, E, P>> {
    return RequestHelper.get<EpicSchema[]>()(this, endpoint`groups/${groupId}/epics`, options);
  }

  create<E extends boolean = false>(
    groupId: string | number,
    title: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<EpicSchema, C, E, void>> {
    return RequestHelper.post<EpicSchema>()(this, endpoint`groups/${groupId}/epics`, {
      title,
      ...options,
    });
  }

  createTodo<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<EpicTodoSchema, C, E, void>> {
    return RequestHelper.post<EpicTodoSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/todos`,
      options,
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<Omit<EpicSchema, '_links'>, C, E, void>> {
    return RequestHelper.put<Omit<EpicSchema, '_links'>>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`groups/${groupId}/epics/${epicIId}`, options);
  }

  show<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicSchema, C, E, void>> {
    return RequestHelper.get<EpicSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}`,
      options,
    );
  }
}
