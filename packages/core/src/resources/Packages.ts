import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { PipelineSchema } from './Pipelines';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface PackageSchema extends Record<string, unknown> {
  id: number;
  name: string;
  version: string;
  package_type: string;
  created_at: string;
}

export interface ExpandedPackageSchema extends PackageSchema {
  _links: Record<string, string>;
  pipelines: PipelineSchema[];
  versions: MappedOmit<ExpandedPackageSchema, '_links'>;
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

export type AllPackageOptions = {
  excludeSubgroups?: boolean;
  orderBy?: 'created_at' | 'name' | 'version' | 'type' | 'project_path';
  sort?: 'asc' | 'desc';
  packageType?: 'conan' | 'maven' | 'npm' | 'pypi' | 'composer' | 'nuget' | 'helm' | 'golang';
  packageName?: string;
  includeVersionless?: boolean;
  status?: 'default' | 'hidden' | 'processing' | 'error' | 'pending_destruction';
};

export class Packages<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllPackageOptions &
      BaseRequestSearchParams &
      OneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PackageSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl('packages', { projects: projectId, groups: groupId });

    return RequestHelper.get<PackageSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  allFiles<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PackageFileSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PackageFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/packages/${packageId}`, {
      sudo,
      showExpanded,
    });
  }

  removeFile<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    projectFileId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files/${projectFileId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedPackageSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedPackageSchema>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
