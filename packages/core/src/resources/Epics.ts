import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { TodoSchema } from './TodoLists';
import type { SimpleUserSchema } from './Users';
import type { GroupSchema } from './Groups';
import type { SimpleLabelSchema } from '../templates/ResourceLabels';

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
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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
  labels: string[] | SimpleLabelSchema[];
  upvotes: number;
  downvotes: number;
  _links: {
    self: string;
    epic_issues: string;
    group: string;
  };
}

export interface EpicSchemaWithExpandedLabels extends EpicSchema {
  labels: SimpleLabelSchema[];
}

export interface EpicSchemaWithBasicLabels extends EpicSchema {
  labels: string[];
}

export interface EpicTodoSchema extends TodoSchema {
  group: Pick<GroupSchema, 'id' | 'name' | 'path' | 'kind' | 'full_path' | 'parent_id'>;
  target_type: 'Epic';
  target: EpicSchema;
}

export type AllEpicsOptions = {
  authorId?: number;
  authorUsername?: string;
  labels?: string;
  withLabelsDetails?: boolean;
  orderBy?: 'created_at' | 'updated_at' | 'title';
  sort?: string;
  search?: string;
  state?: string;
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  includeAncestorGroups?: boolean;
  includeDescendantGroups?: boolean;
  myReactionEmoji?: string;
  not?: Record<string, string>;
};

export type CreateEpicOptions = {
  labels?: string;
  description?: string;
  color?: string;
  confidential?: boolean;
  createdAt?: string;
  startDateIsFixed?: boolean;
  startDateFixed?: string;
  dueDateIsFixed?: boolean;
  dueDateFixed?: string;
  parentId?: number | string;
};

export type EditEpicOptions = {
  addLabels?: string;
  confidential?: boolean;
  description?: string;
  dueDateFixed?: string;
  dueDateIsFixed?: boolean;
  labels?: string;
  parentId?: number | string;
  removeLabels?: string;
  startDateFixed?: string;
  startDateIsFixed?: boolean;
  stateEvent?: string;
  title?: string;
  updatedAt?: string;
  color?: string;
};
export class Epics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: AllEpicsOptions &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E> & { withLabelsDetails: true },
  ): Promise<GitlabAPIResponse<EpicSchemaWithExpandedLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllEpicsOptions &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E> & { withLabelsDetails?: false },
  ): Promise<GitlabAPIResponse<EpicSchemaWithBasicLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllEpicsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<EpicSchema[]>()(this, endpoint`groups/${groupId}/epics`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  create<E extends boolean = false>(
    groupId: string | number,
    title: string,
    options?: CreateEpicOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<EpicSchema>()(this, endpoint`groups/${groupId}/epics`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        title,
      },
    });
  }

  createTodo<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicTodoSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<EpicTodoSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/todos`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: EditEpicOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MappedOmit<EpicSchema, '_links'>, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MappedOmit<EpicSchema, '_links'>>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/epics/${epicIId}`, {
      showExpanded,
      sudo,
    });
  }

  show<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<EpicSchema>()(this, endpoint`groups/${groupId}/epics/${epicIId}`, {
      showExpanded,
      sudo,
    });
  }
}
