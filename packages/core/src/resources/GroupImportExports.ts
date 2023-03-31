import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class GroupImportExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/export/download`, options);
  }

  // TODO: What does this return?
  import<E extends boolean = false>(
    content: Blob,
    name: string,
    path: string,
    {
      filename,
      parentId,
      ...options
    }: { parentId?: number; filename?: string } & Sudo & ShowExpanded<E> = {
      filename: `${Date.now().toString()}.tar.gz`,
    },
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, 'groups/import', {
      isForm: true,
      ...options,
      file: [content, filename],
      path,
      name,
      parentId,
    });
  }

  scheduleExport<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`groups/${groupId}/export`,
      options,
    );
  }
}
