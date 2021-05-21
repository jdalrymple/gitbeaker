import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges, BadgeSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectBadgeSchema extends BadgeSchema {
  kind: 'project';
}

export interface ProjectBadges extends ResourceBadges {
  add(productId: string | number, options?: BaseRequestOptions): Promise<ProjectBadgeSchema>;

  all(productId: string | number, options?: PaginatedRequestOptions): Promise<ProjectBadgeSchema[]>;

  edit(
    productId: string | number,
    badgeId: number,
    options?: BaseRequestOptions,
  ): Promise<ProjectBadgeSchema>;

  preview(
    productId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo,
  ): Promise<Omit<ProjectBadgeSchema, 'id' | 'name' | 'kind'>>;

  remove(productId: string | number, badgeId: number, options?: Sudo): Promise<void>;

  show(productId: string | number, badgeId: number, options?: Sudo): Promise<ProjectBadgeSchema>;
}

export class ProjectBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
