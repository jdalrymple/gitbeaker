import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import type { BadgeSchema } from '../templates/ResourceBadges';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectBadgeSchema extends BadgeSchema {
  kind: 'project';
}

export type ProjectBadgePreviewSchema = Omit<ProjectBadgeSchema, 'id' | 'name' | 'kind'>;

export interface ProjectBadges<C extends boolean = false> extends ResourceBadges<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectBadgeSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectBadgeSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectBadgeSchema, C, E, void>>;

  preview<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectBadgePreviewSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectBadgeSchema, C, E, void>>;
}

export class ProjectBadges<C extends boolean = false> extends ResourceBadges<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
