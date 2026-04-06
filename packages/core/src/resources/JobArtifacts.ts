import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { JobSchema } from './Jobs';

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
    }: (
      | { jobId: number; artifactPath?: undefined; job?: undefined; ref?: undefined }
      | { jobId: number; artifactPath: string; job?: undefined; ref?: undefined }
      | {
          ref: string;
          job: string;
          jobId?: undefined;
          artifactPath?: undefined;
          searchRecentSuccessfulPipelines?: boolean;
        }
      | { ref: string; job: string; artifactPath: string; jobId?: undefined }
    ) & { jobToken?: string } & Sudo &
      ShowExpanded<E> = {} as any,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: { jobId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { jobId, sudo, showExpanded } = options || {};
    const url = getPrefixedUrl('artifacts', { projects: projectId, jobs: jobId });

    return RequestHelper.del()(this, url, { sudo, showExpanded });
  }
}
