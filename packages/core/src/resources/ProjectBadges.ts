import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import { BadgeSchema } from '../templates/types';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface ProjectBadgeSchema extends BadgeSchema {
  kind: 'project';
}

export interface ProjectBadges<C extends boolean = false> extends ResourceBadges<C> {
  add(
    productId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ProjectBadgeSchema>>;

  all(
    productId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ProjectBadgeSchema>[]>;

  edit(
    productId: string | number,
    badgeId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ProjectBadgeSchema>>;

  preview(
    productId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, Omit<ProjectBadgeSchema, 'id' | 'name' | 'kind'>>>;

  remove(productId: string | number, badgeId: number, options?: Sudo): Promise<void>;

  show(
    productId: string | number,
    badgeId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, ProjectBadgeSchema>>;
}

export class ProjectBadges<C extends boolean = false> extends ResourceBadges<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
