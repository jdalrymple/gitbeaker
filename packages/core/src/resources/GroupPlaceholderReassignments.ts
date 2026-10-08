import { BaseResource } from '@gitbeaker/requester-utils';

import type { AsStream, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export class GroupPlaceholderReassignments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    groupId: string | number,
    options: { asStream: true } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReadableStream, C, E, void>>;

  all<E extends boolean = false>(
    groupId: string | number,
    options?: { asStream?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  all<E extends boolean = false>(
    groupId: string | number,
    options?: AsStream & ShowExpanded<E> & Sudo,
  ): Promise<any> {
    const { sudo, showExpanded, asStream, ...searchParams } = options || {};

    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`groups/${groupId}/placeholder_reassignments`,
      {
        sudo,
        showExpanded,
        asStream,
        searchParams,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    file: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`groups/${groupId}/placeholder_reassignments`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          file: [file.content, file.filename],
        }),
      },
    );
  }
}
