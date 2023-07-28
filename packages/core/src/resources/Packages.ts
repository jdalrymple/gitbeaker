import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { PipelineSchema } from './Pipelines';

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
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> &
      AllPackageOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P> = {} as any,
  ): Promise<GitlabAPIResponse<PackageSchema[], C, E, P>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/packages`;
    else if (groupId) url = endpoint`groups/${groupId}/packages`;
    else {
      throw new Error(
        'Missing required argument. Please supply a projectId or a groupId in the options parameter.',
      );
    }

    return RequestHelper.get<PackageSchema[]>()(this, url, options as Sudo & ShowExpanded<E>);
  }

  allFiles<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PackageFileSchema[], C, E, void>> {
    return RequestHelper.get<PackageFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}`,
      options,
    );
  }

  removeFile<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    projectFileId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}/package_files/${projectFileId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    packageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedPackageSchema, C, E, void>> {
    return RequestHelper.get<ExpandedPackageSchema>()(
      this,
      endpoint`projects/${projectId}/packages/${packageId}`,
      options,
    );
  }
}
