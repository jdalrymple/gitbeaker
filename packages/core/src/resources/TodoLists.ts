import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { UserSchema } from './Users';
import type { SimpleProjectSchema } from './Projects';

export type TodoAction =
  | 'assigned'
  | 'mentioned'
  | 'build_failed'
  | 'marked'
  | 'approval_required'
  | 'unmergeable'
  | 'directly_addressed'
  | 'merge_train_removed';
export type TodoType =
  | 'Issue'
  | 'MergeRequest'
  | 'Commit'
  | 'Epic'
  | 'DesignManagement::Design'
  | 'AlertManagement::Alert';
export type TodoState = 'pending' | 'done';

export interface TodoSchema extends Record<string, unknown> {
  id: number;
  author: MappedOmit<UserSchema, 'created_at'>;
  project: Pick<
    SimpleProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  action_name: TodoAction;
  target_type: TodoType;
  target: Record<string, unknown>;
  target_url: string;
  body: string;
  state: TodoState;
  created_at: string;
  updated_at: string;
}

export class TodoLists<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      action?: TodoAction;
      authorId?: number;
      projectId?: string | number;
      groupId?: string | number;
      state?: TodoState;
      type?: TodoType;
    } & Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<TodoSchema[], C, E, P>> {
    return RequestHelper.get<TodoSchema[]>()(this, 'todos', options);
  }

  done<E extends boolean = false>(
    options: { todoId: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TodoSchema, C, E, void>>;

  done<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  done<E extends boolean = false>({
    todoId,
    ...options
  }: { todoId?: number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<void | TodoSchema, C, E, void>
  > {
    let prefix = 'todos';

    if (todoId) prefix += `/${todoId}`;

    return RequestHelper.post<void | TodoSchema>()(
      this,
      `${prefix}/mark_as_done`,
      options as Sudo & ShowExpanded<E>,
    );
  }
}
