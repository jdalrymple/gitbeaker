import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  AsStream,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { JobSchema } from './Jobs';

import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface ArtifactFileSchema extends Record<string, unknown> {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  mode: string;
}

export type DownloadArchiveOptions = { jobToken?: string } & (
  | { jobId: number; artifactPath?: undefined; job?: undefined; ref?: undefined }
  | { jobId: number; artifactPath: string; job?: undefined; ref?: undefined }
  | {
      jobId?: undefined;
      artifactPath?: undefined;
      job: string;
      ref: string;
      searchRecentSuccessfulPipelines?: boolean;
    }
  | {
      jobId?: undefined;
      artifactPath: string;
      job: string;
      ref: string;
      searchRecentSuccessfulPipelines?: boolean;
    }
);

export class JobArtifacts<C extends boolean = false> extends BaseResource<C> {
  downloadArchive<E extends boolean = false>(
    projectId: string | number,
    options: { asStream: true } & DownloadArchiveOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  downloadArchive<E extends boolean = false>(
    projectId: string | number,
    options?: { asStream?: boolean } & DownloadArchiveOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  downloadArchive<E extends boolean = false>(
    projectId: string | number,
    {
      jobId,
      artifactPath,
      ref,
      job,
      sudo,
      showExpanded,
      asStream,
      ...searchParams
    }: AsStream & DownloadArchiveOptions & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<any> {
    let url = '';

    ensureRequiredParams({ jobId, 'job and ref': job && ref });

    if (jobId)
      url = getPrefixedUrl('', {
        projects: projectId,
        jobs: jobId,
        artifacts: artifactPath || true,
      });
    else if (job && ref)
      url = getPrefixedUrl('', {
        projects: projectId,
        jobs: true,
        artifacts: ref,
        raw: artifactPath,
        download: !artifactPath,
      });

    return RequestHelper.get<Blob | ReadableStream>()(this, url, {
      sudo,
      showExpanded,
      asStream,
      searchParams,
    });
  }

  keep<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/artifacts/keep`,
      { sudo, showExpanded },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { jobId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { jobId, sudo, showExpanded } = options || {};
    const url = getPrefixedUrl('artifacts', { projects: projectId, jobs: jobId });

    return RequestHelper.del()(this, url, { sudo, showExpanded });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    jobId: number,
    options?: {
      path?: string;
      recursive?: boolean;
      jobToken?: string;
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ArtifactFileSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ArtifactFileSchema[]>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/artifacts/tree`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }
}
