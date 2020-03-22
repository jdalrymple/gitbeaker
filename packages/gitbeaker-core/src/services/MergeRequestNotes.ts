import { ResourceNotes } from '../templates';
import { GetResponse } from '../infrastructure/RequestHelper';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface MergeRequestNotes extends ResourceNotes {
  all(
    projectId: string | number,
    mergerequestIId: string | number,
    options: PaginatedRequestOptions,
  ): Promise<GetResponse>;

  create(
    projectId: string | number,
    mergerequestIId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  edit(
    projectId: string | number,
    mergerequestIId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  remove(
    projectId: string | number,
    mergerequestIId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<object>;

  show(
    projectId: string | number,
    mergerequestIId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<GetResponse>;
}

export class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
