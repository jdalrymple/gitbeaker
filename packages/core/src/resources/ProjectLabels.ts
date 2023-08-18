import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceLabels } from '../templates';
import type { LabelCountSchema, LabelSchema } from '../templates/ResourceLabels';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectLabels<C extends boolean = false> extends ResourceLabels<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: {
      withCounts: true;
      includeAncestorGroups?: boolean;
      search?: string;
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(LabelSchema & LabelCountSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: {
      includeAncestorGroups?: boolean;
      search?: string;
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      withCounts?: boolean;
      includeAncestorGroups?: boolean;
      search?: string;
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    labelName: string,
    color: string,
    options?: { description?: string; priority?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options: OneOf<{ newName: string; color: string }> & {
      description?: string;
      priority?: number;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;

  promote<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options?: { includeAncestorGroups?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;

  subscribe<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;

  unsubscribe<E extends boolean = false>(
    projectId: string | number,
    labelId: number | string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelSchema, C, E, void>>;
}

export class ProjectLabels<C extends boolean = false> extends ResourceLabels<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
