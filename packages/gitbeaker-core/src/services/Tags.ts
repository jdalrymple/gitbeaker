import { BaseService } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { ReleaseSchema } from './Releases';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface TagSchema extends Record<string, unknown> {
  commit: CommitSchema;
  release: Pick<ReleaseSchema, 'tag_name' | 'description'>;
  name: string;
  target: string;
  message?: null;
  protected: boolean;
}

export class Tags<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<TagSchema[]>()(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<TagSchema>()(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/repository/tags/${tId}`, options);
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get<TagSchema>()(this, `projects/${pId}/repository/tags/${tId}`, options);
  }
}
