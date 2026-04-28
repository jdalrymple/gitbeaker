import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { JobSchema } from './Jobs';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export class JobArtifacts<C extends boolean = false> extends BaseResource<C> {
  downloadArchive<E extends boolean = false>(
    projectId: string | number,
    {
      jobId,
      artifactPath,
      ref,
      job,
      sudo,
      showExpanded,
      ...searchParams
    }: { jobToken?: string } & ShowExpanded<E> &
      Sudo &
      (
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
      ) = {} as any,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
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

    return RequestHelper.get<Blob>()(this, url, {
      sudo,
      showExpanded,
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
}
