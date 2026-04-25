import type { AsStream, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { ImportStatusSchema } from './ProjectImportExports';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export class GroupImportExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    groupId: string | number,
    options: { asStream: true } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  download<E extends boolean = false>(
    groupId: string | number,
    options?: { asStream?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  download<E extends boolean = false>(
    groupId: string | number,
    options?: AsStream & ShowExpanded<E> & Sudo,
  ): Promise<any> {
    const { sudo, showExpanded, asStream, ...searchParams } = options || {};

    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`groups/${groupId}/export/download`,
      {
        sudo,
        showExpanded,
        asStream,
        searchParams,
      },
    );
  }

  import<E extends boolean = false>(
    file: { content: Blob; filename: string },
    path: string,
    { parentId, name, ...options }: { parentId?: number; name?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'groups/import', {
      sudo,
      showExpanded,
      body: createFormData({
        ...body,
        file: [file.content, file.filename],
        path,
        name: name || path.split('/').at(0),
        parentId,
      }),
    });
  }

  scheduleExport<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(this, endpoint`groups/${groupId}/export`, {
      sudo,
      showExpanded,
    });
  }
}
