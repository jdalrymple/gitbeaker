import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { ResourceLabels } from '../templates';

export interface Labels<C extends boolean = false> extends ResourceLabels<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>);

  create(
    projectId: string | number,
    labelName: string,
    color: string,
    options?: BaseRequestOptions,
  );

  edit(projectId: string | number, labelName: string, options?: BaseRequestOptions);

  remove(projectId: string | number, labelName: string, options?: Sudo);

  subscribe(projectId: string | number, labelId: number, options?: Sudo);

  unsubscribe(projectId: string | number, labelId: number, options?: Sudo);
}

export class Labels<C extends boolean = false> extends ResourceLabels<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
