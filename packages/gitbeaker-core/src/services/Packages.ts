import { BaseService } from '@gitbeaker/requester-utils';
import { PipelineSchema } from './Pipelines';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

// TODO: Add group support

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

export class Packages extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PackageSchema[]>()(this, `projects/${pId}/packages`, options);
  }

  remove(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/packages/${pkId}`, options);
  }

  show(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get<PackageSchema>()(this, `projects/${pId}/packages/${pkId}`, options);
  }

  showFiles(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get<PackageFileSchema[]>()(
      this,
      `projects/${pId}/packages/${pkId}/package_files`,
      options,
    );
  }
}
