import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { JobSchema } from './Jobs';

function generateDownloadPathForJob(
  projectId: string | number,
  jobId: number,
  artifactPath?: string,
) {
  let url = endpoint`projects/${projectId}/jobs/${jobId}/artifacts`;

  if (artifactPath) url += `/${artifactPath}`;

  return url;
}

function generateDownloadPath(projectId: string | number, ref: string, artifactPath?: string) {
  let url = endpoint`projects/${projectId}/jobs/artifacts/${ref}`;

  if (artifactPath) {
    url += endpoint`/raw/${artifactPath}`;
  } else {
    url += endpoint`/download`;
  }

  return url;
}

export class JobArtifacts<C extends boolean = false> extends BaseResource<C> {
  downloadArchive<E extends boolean = false>(
    projectId: string | number,
    {
      jobId,
      artifactPath,
      ref,
      ...options
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
    let url: string;

    if (jobId) url = generateDownloadPathForJob(projectId, jobId, artifactPath);
    else if (options?.job && ref) url = generateDownloadPath(projectId, ref, artifactPath);
    else
      throw new Error(
        'Missing one of the required parameters. See typing documentation for available arguments.',
      );

    return RequestHelper.get<Blob>()(this, url, options);
  }

  keep<E extends boolean = false>(
    projectId: string | number,
    jobId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobSchema, C, E, void>> {
    return RequestHelper.post<JobSchema>()(
      this,
      endpoint`projects/${projectId}/jobs/${jobId}/artifacts/keep`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    { jobId, ...options }: { jobId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    let url: string;

    if (jobId) {
      url = endpoint`projects/${projectId}/jobs/${jobId}/artifacts`;
    } else {
      url = endpoint`projects/${projectId}/artifacts`;
    }

    return RequestHelper.del()(this, url, options);
  }
}
