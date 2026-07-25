import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface DependencyListExportSchema extends Record<string, unknown> {
  id: number;
  status?: string;
  has_finished: boolean;
  export_type?: string;
  send_email?: boolean;
  expires_at?: string;
  self: string;
  download: string;
}

export class DependencyListExport<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    id: string | number,
    exportType: string,
    options?: {
      sendEmail?: boolean;
      entity?: 'projects' | 'groups' | 'pipelines';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DependencyListExportSchema, C, E, void>> {
    const { showExpanded, sudo, entity = 'projects', ...body } = options || {};

    return RequestHelper.post<DependencyListExportSchema>()(
      this,
      endpoint`${entity}/${id}/dependency_list_exports`,
      {
        showExpanded,
        sudo,
        body: {
          ...body,
          exportType,
        },
      },
    );
  }

  show<E extends boolean = false>(
    exportId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DependencyListExportSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<DependencyListExportSchema>()(
      this,
      endpoint`dependency_list_exports/${exportId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  download<E extends boolean = false>(
    exportId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<Record<string, unknown>>()(
      this,
      endpoint`dependency_list_exports/${exportId}/download`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
