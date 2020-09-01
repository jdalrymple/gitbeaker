import { ResourceNotes } from '../templates';
import {
  GetResponse,
  PostResponse,
  PutResponse,
  DelResponse,
} from '../infrastructure/RequestHelper';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface MergeRequestNotes extends ResourceNotes {
  all(
    projectId: string | number,
    mergerequestIid: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<GetResponse>;

  create(
    projectId: string | number,
    mergerequestIid: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<PostResponse>;

  edit(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<PutResponse>;

  remove(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<DelResponse>;

  show(
    projectId: string | number,
    mergerequestIid: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<GetResponse>;
}

export class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
