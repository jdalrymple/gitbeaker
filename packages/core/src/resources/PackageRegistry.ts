import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface PackageRegistrySchema extends Record<string, unknown> {
  id: number;
  package_id: number;
  created_at: string;
  updated_at: string;
  size: number;
  file_store: number;
  file_md5?: string;
  file_sha1?: string;
  file_name: string;
  file: {
    url: string;
  };
  file_sha256: string;
  verification_retry_at?: string;
  verified_at?: string;
  verification_failure?: string;
  verification_retry_count?: string;
  verification_checksum?: string;
  verification_state: number;
  verification_started_at?: string;
  new_file_path?: string;
}

export class PackageRegistry<C extends boolean = false> extends BaseResource<C> {
  publish<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    content: Blob,
    options: {
      select: 'package_file';
      contentType?: string;
      status?: 'default' | 'hidden';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PackageRegistrySchema, C, E, void>>;

  publish<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    content: Blob,
    options?: { contentType?: string; status?: 'default' | 'hidden' } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>>;

  publish<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    content: Blob,
    {
      contentType,
      ...options
    }: { contentType?: string; status?: 'default' | 'hidden'; select?: 'package_file' } & Sudo &
      ShowExpanded<E> = {} as { contentType?: string },
  ): Promise<any> {
    return RequestHelper.put<PackageRegistrySchema | { message: string }>()(
      this,
      endpoint`projects/${projectId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      {
        isForm: true,
        file: [content, filename],
        ...options,
      },
    );
  }

  download<E extends boolean = false>(
    projectId: string | number,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/packages/generic/${packageName}/${packageVersion}/${filename}`,
      options,
    );
  }
}
