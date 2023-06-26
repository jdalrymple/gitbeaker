import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { AsStream, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { ImportStatusSchema } from './ProjectImportExports';

export class GroupImportExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    groupId: string | number,
    options: { asStream: true } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  download<E extends boolean = false>(
    groupId: string | number,
    options?: { asStream?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  download<E extends boolean = false>(
    groupId: string | number,
    options?: AsStream & ShowExpanded<E> & Sudo,
  ): Promise<any> {
    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`groups/${groupId}/export/download`,
      options,
    );
  }

  import<E extends boolean = false>(
    file: { content: Blob; filename: string },
    path: string,
    { parentId, name, ...options }: { parentId?: number; name?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    return RequestHelper.post<ImportStatusSchema>()(this, 'groups/import', {
      isForm: true,
      ...options,
      file: [file.content, file.filename],
      path,
      name: name || path.split('/').at(0),
      parentId,
    });
  }

  scheduleExport<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`groups/${groupId}/export`,
      options,
    );
  }
}
