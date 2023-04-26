import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { Either, GitlabAPIResponse, ShowExpanded } from '../infrastructure';

function url({
  projectId,
  groupId,
}: { projectId?: string | number; groupId?: string | number } = {}): string {
  if (projectId) return endpoint`/projects/${projectId}/packages/debian`;
  if (groupId) return endpoint`/groups/${groupId}/-/packages/debian`;

  throw new Error(
    'Missing required argument. Please supply a projectId or a groupId in the options parameter',
  );
}

export class Debian<C extends boolean = false> extends BaseResource<C> {
  downloadBinaryFileIndex<E extends boolean = false>(
    distribution: string,
    component: string,
    architecture: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const prefix = url({
      projectId,
      groupId,
    });

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/dists/${distribution}/${component}/binary-${architecture}/Packages`,
      options as ShowExpanded<E>,
    );
  }

  downloadDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const prefix = url({
      projectId,
      groupId,
    });

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/dists/${distribution}/Release`,
      options as ShowExpanded<E>,
    );
  }

  downloadSignedDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const prefix = url({
      projectId,
      groupId,
    });

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/dists/${distribution}/InRelease`,
      options as ShowExpanded<E>,
    );
  }

  downloadReleaseFileSignature<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: Either<{ projectId: string | number }, { groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const prefix = url({
      projectId,
      groupId,
    });

    return RequestHelper.get<Blob>()(
      this,
      `${prefix}/dists/${distribution}/Release.gpg`,
      options as ShowExpanded<E>,
    );
  }

  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    distribution: string,
    letter: string,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/debian/pool/${distribution}/${letter}/${packageName}/${packageVersion}/${filename}`,
      options,
    );
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    content: Blob,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/debian/${filename}`,
      {
        isForm: true,
        ...options,
        file: [content, filename],
      },
    );
  }
}
