import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, getPrefixedUrl } from '../infrastructure';

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
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<TodoSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<TodoSchema[]>()(this, 'todos', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  done<E extends boolean = false>(
    options: { todoId: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TodoSchema, C, E, void>>;

  done<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  done<E extends boolean = false>({
    todoId,
    ...options
  }: { todoId?: number } & ShowExpanded<E> & Sudo = {}): Promise<
    GitlabAPIResponse<void | TodoSchema, C, E, void>
  > {
    const { sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('mark_as_done', { todos: todoId || true });

    return RequestHelper.post<void | TodoSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
