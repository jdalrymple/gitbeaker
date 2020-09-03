import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestNotes extends ResourceNotes {
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

export class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
