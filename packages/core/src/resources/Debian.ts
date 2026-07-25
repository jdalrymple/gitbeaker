import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';

import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

export interface DebianDistributionSchema extends Record<string, unknown> {
  id: number;
  codename: string;
  suite: string | null;
  origin: string | null;
  label: string | null;
  version: string | null;
  description: string | null;
  valid_time_duration_seconds: number | null;
  components: string[];
  architectures: string[];
}

export type CreateDistributionOptions = {
  codename: string;
  suite?: string;
  origin?: string;
  label?: string;
  version?: string;
  description?: string;
  validTimeDurationSeconds?: number;
  components?: string[];
  architectures?: string[];
};

export type EditDistributionOptions = {
  suite?: string;
  origin?: string;
  label?: string;
  version?: string;
  description?: string;
  validTimeDurationSeconds?: number;
  components?: string[];
  architectures?: string[];
};

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

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/binary-${architecture}/Packages`,
      {
        projects: projectId,
        groups: groupId ? `${groupId}/-` : undefined,
      },
    );

    return RequestHelper.get<Blob>()(this, url, {
      showExpanded,
    });
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

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/Release`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<Blob>()(this, url, { showExpanded });
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

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/InRelease`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<Blob>()(this, url, { showExpanded });
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

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(`packages/debian/dists/${distribution}/Release.gpg`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<Blob>()(this, url, { showExpanded });
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

  allDistributions<E extends boolean = false>({
    projectId,
    groupId,
    ...options
  }: {
    codename?: string;
    suite?: string;
  } & OneOf<{ projectId: string | number; groupId: string | number }> &
    ShowExpanded<E> &
    Sudo): Promise<GitlabAPIResponse<DebianDistributionSchema[], C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { sudo, showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl('debian_distributions', {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<DebianDistributionSchema[]>()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  showDistribution<E extends boolean = false>(
    codename: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DebianDistributionSchema, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { sudo, showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(`debian_distributions/${codename}`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<DebianDistributionSchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  showDistributionKey<E extends boolean = false>(
    codename: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(`debian_distributions/${codename}/key.asc`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<string>()(this, url, { showExpanded, searchParams });
  }

  createDistribution<E extends boolean = false>({
    projectId,
    groupId,
    ...options
  }: CreateDistributionOptions &
    OneOf<{ projectId: string | number; groupId: string | number }> &
    ShowExpanded<E> &
    Sudo): Promise<GitlabAPIResponse<DebianDistributionSchema, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { sudo, showExpanded, ...body } = options || {};

    const url = getPrefixedUrl('debian_distributions', {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.post<DebianDistributionSchema>()(this, url, {
      sudo,
      showExpanded,
      body,
    });
  }

  editDistribution<E extends boolean = false>(
    codename: string,
    {
      projectId,
      groupId,
      ...options
    }: EditDistributionOptions &
      OneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DebianDistributionSchema, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { sudo, showExpanded, ...body } = options || {};

    const url = getPrefixedUrl(`debian_distributions/${codename}`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.put<DebianDistributionSchema>()(this, url, {
      sudo,
      showExpanded,
      body,
    });
  }

  removeDistribution<E extends boolean = false>(
    codename: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { sudo, showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(`debian_distributions/${codename}`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.del<void>()(this, url, { sudo, showExpanded, searchParams });
  }

  downloadBinaryFileIndexByHash<E extends boolean = false>(
    distribution: string,
    component: string,
    architecture: string,
    fileSha256: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/binary-${architecture}/by-hash/SHA256/${fileSha256}`,
      {
        projects: projectId,
        groups: groupId ? `${groupId}/-` : undefined,
      },
    );

    return RequestHelper.get<Blob>()(this, url, { showExpanded, searchParams });
  }

  downloadDebianInstallerIndex<E extends boolean = false>(
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

    const { showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/debian-installer/binary-${architecture}/Packages`,
      {
        projects: projectId,
        groups: groupId ? `${groupId}/-` : undefined,
      },
    );

    return RequestHelper.get<Blob>()(this, url, { showExpanded, searchParams });
  }

  downloadDebianInstallerIndexByHash<E extends boolean = false>(
    distribution: string,
    component: string,
    architecture: string,
    fileSha256: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { showExpanded, ...searchParams } = options || {};

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/debian-installer/binary-${architecture}/by-hash/SHA256/${fileSha256}`,
      {
        projects: projectId,
        groups: groupId ? `${groupId}/-` : undefined,
      },
    );

    return RequestHelper.get<Blob>()(this, url, { showExpanded, searchParams });
  }

  downloadSourceIndex<E extends boolean = false>(
    distribution: string,
    component: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(`dists/${distribution}/${component}/source/Sources`, {
      projects: projectId,
      groups: groupId ? `${groupId}/-` : undefined,
    });

    return RequestHelper.get<Blob>()(this, url, { showExpanded });
  }

  downloadSourceIndexByHash<E extends boolean = false>(
    distribution: string,
    component: string,
    fileSha256: string,
    {
      projectId,
      groupId,
      ...options
    }: OneOf<{ projectId: string | number; groupId: string | number }> & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    ensureRequiredParams({ projectId, groupId });

    const { showExpanded } = options || {};

    const url = getPrefixedUrl(
      `dists/${distribution}/${component}/source/by-hash/SHA256/${fileSha256}`,
      {
        projects: projectId,
        groups: groupId ? `${groupId}/-` : undefined,
      },
    );

    return RequestHelper.get<Blob>()(this, url, { showExpanded });
  }
}
