import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    mergerequestIid: string | number,
    options?: PaginatedRequestOptions,
  );

  create(
    projectId: string | number,
    mergerequestIid: string | number,
    body: string,
    options?: BaseRequestOptions,
  );

  edit(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  );

  remove(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    options?: Sudo,
  );
}

export class MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'merge_requests', options);
  }
}
