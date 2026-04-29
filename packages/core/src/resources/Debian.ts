import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOf, ShowExpanded } from '../infrastructure';

import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

export class Debian<C extends boolean = false> extends BaseResource<C> {
  downloadBinaryFileIndex<E extends boolean = false>(
    distribution: string,
    component: string,
    architecture: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/binary-${architecture}/Packages`,
      {
        projects: projectId,
        'groups/-': groupId,
      },
    );

    return RequestHelper.get<Blob>()(this, url, options as ShowExpanded<E>);
  }

  downloadDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/Release`, {
      projects: projectId,
      'groups/-': groupId,
    });

    return RequestHelper.get<Blob>()(this, url, options as ShowExpanded<E>);
  }

  downloadSignedDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/InRelease`, {
      projects: projectId,
      'groups/-': groupId,
    });

    return RequestHelper.get<Blob>()(this, url, options as ShowExpanded<E>);
  }

  downloadReleaseFileSignature<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/Release.gpg`, {
      projects: projectId,
      'groups/-': groupId,
    });

    return RequestHelper.get<Blob>()(this, url, options as ShowExpanded<E>);
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
    const { showExpanded } = options || {};
    const url = getPrefixedUrl(
      `packages/debian/pool/${distribution}/${letter}/${packageName}/${packageVersion}/${filename}`,
      {
        projects: projectId,
      },
    );

    return RequestHelper.get<Blob>()(this, url, {
      showExpanded,
    });
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    packageFile: { content: Blob; filename: string },
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded } = options || {};

    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/packages/debian/${packageFile.filename}`,
      {
        showExpanded,
        body: createFormData({
          file: [packageFile.content, packageFile.filename],
        }),
      },
    );
  }
}
