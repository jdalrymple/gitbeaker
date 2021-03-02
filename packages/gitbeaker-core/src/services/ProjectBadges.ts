import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectBadges<C extends boolean = false> extends ResourceBadges() {
  add(projectId: string | number, options?: BaseRequestOptions);

  all(projectId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>);

  edit(projectId: string | number, badgeId: number, options?: BaseRequestOptions);

  preview(projectId: string | number, linkUrl: string, imageUrl: string, options?: Sudo);

  remove(projectId: string | number, badgeId: number, options?: Sudo);

  show(projectId: string | number, badgeId: number, options?: Sudo);
}

export class ProjectBadges<C extends boolean = false> extends ResourceBadges() {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
