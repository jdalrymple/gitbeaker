import { BaseResource } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { ReleaseSchema } from './Releases';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface TagSchema extends Record<string, unknown> {
  commit: CommitSchema;
  release: Pick<ReleaseSchema, 'tag_name' | 'description'>;
  name: string;
  target: string;
  message?: string;
  protected: boolean;
}

export class Tags<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<TagSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/tags`,
      options,
    );
  }

  create(projectId: string | number, tagName: string, ref: string, options?: BaseRequestOptions) {
    return RequestHelper.post<TagSchema>()(this, endpoint`projects/${projectId}/repository/tags`, {
      query: {
        tagName,
        ref,
      },
      ...options,
    });
  }

  remove(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}`,
      options,
    );
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.get<TagSchema>()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}`,
      options,
    );
  }
}
