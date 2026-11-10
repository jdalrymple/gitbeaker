import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export class ModelRegistry<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    projectId: string | number,
    modelVersionId: string | number,
    fileName: string,
    options?: {
      path?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    const { sudo, showExpanded, path, ...searchParams } = options || {};
    const filePath = path ? endpoint`${path}/${fileName}` : fileName;

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/ml_models/${modelVersionId}/files/${filePath}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  authorizeUpload<E extends boolean = false>(
    projectId: string | number,
    modelVersionId: string | number,
    fileName: string,
    options?: {
      path?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, path, ...searchParams } = options || {};
    const filePath = path ? `${path}/${fileName}` : fileName;

    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/ml_models/${modelVersionId}/files/${filePath}/authorize`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  upload<E extends boolean = false>(
    projectId: string | number,
    modelVersionId: string | number,
    fileName: string,
    file: File | Blob,
    options?: {
      path?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, path } = options || {};
    const filePath = path ? `${path}/${fileName}` : fileName;

    const formData = new FormData();

    formData.append('file', file);

    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/ml_models/${modelVersionId}/files/${filePath}`,
      {
        sudo,
        showExpanded,
        body: formData,
      },
    );
  }
}
