import { BaseResource } from '@gitbeaker/requester-utils';
import { PipelineSchema } from './Pipelines';
import { endpoint, PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export interface PackageSchema extends Record<string, unknown> {
  id: number;
  name: string;
  version: string;
  package_type: string;
  created_at: string;
}

export interface PackageFileSchema extends Record<string, unknown> {
  id: number;
  package_id: number;
  created_at: string;
  file_name: string;
  size: number;
  file_md5: string;
  file_sha1: string;
  pipelines?: PipelineSchema[];
}

export class Packages<C extends boolean = false> extends BaseResource<C> {
  all({
    projectId,
    groupId,
    ...options
  }: { projectId?: string | number; groupId?: string | number } & PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/packages`;
    } else if (groupId) {
      url = endpoint`groups/${groupId}/packages`;
    } else {
      throw new Error('projectId or groupId must be passed');
    }

    return RequestHelper.get<PackageSchema[]>()(this, url, options);
  }

  remove(projectId: string | number, packageId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}`,
      options,
    );
  }

  removeFile(projectId: string | number, packageId: number, projectFileId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files/${projectFileId}`,
      options,
    );
  }

  show(projectId: string | number, packageId: number, options?: Sudo) {
    return RequestHelper.get<PackageSchema>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}`,
      options,
    );
  }

  showFiles(projectId: string | number, packageId: number, options?: Sudo) {
    return RequestHelper.get<PackageFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files`,
      options,
    );
  }
}
