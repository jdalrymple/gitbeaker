import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectBadges extends ResourceBadges {
  add(projectId: string | number, options?: BaseRequestOptions);

  all(projectId: string | number, options?: PaginatedRequestOptions);

  edit(projectId: string | number, badgeId: number, options?: BaseRequestOptions);

  preview(projectId: string | number, linkUrl: string, imageUrl: string, options?: Sudo);

  remove(projectId: string | number, badgeId: number, options?: Sudo);

  show(projectId: string | number, badgeId: number, options?: Sudo);
}

export class ProjectBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
