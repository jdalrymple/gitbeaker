import { BaseResource } from '@gitbeaker/requester-utils';
import { PipelineSchema } from './Pipelines';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

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
      url = `projects/${encodeURIComponent(projectId)}/packages`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/packages`;
    } else {
      throw new Error('projectId or groupId must be passed');
    }

    return RequestHelper.get<PackageSchema[]>()(this, url, options);
  }

  remove(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkgId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/packages/${pkgId}`, options);
  }

  removeFile(projectId: string | number, packageId: number, projectFileId: number, options?: Sudo) {
    const [pId, pkgId, pfId] = [projectId, packageId, projectFileId].map(encodeURIComponent);

    return RequestHelper.del()(
      this,
      `projects/${pId}/packages/${pkgId}/package_files/${pfId}`,
      options,
    );
  }

  show(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkgId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get<PackageSchema>()(this, `projects/${pId}/packages/${pkgId}`, options);
  }

  showFiles(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkgId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get<PackageFileSchema[]>()(
      this,
      `projects/${pId}/packages/${pkgId}/package_files`,
      options,
    );
  }
}
