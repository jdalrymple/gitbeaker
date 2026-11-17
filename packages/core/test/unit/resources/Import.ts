import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Import } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Import;

beforeEach(() => {
  service = new Import({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Import.importGithubRepository', () => {
  it('should request POST /import/github', async () => {
    await service.importGithubRepository('tok', 12, 'ns', {
      newName: 'n',
      timeoutStrategy: 'optimistic',
      sudo: 'u',
      showExpanded: true,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/github', {
      sudo: 'u',
      showExpanded: true,
      body: {
        newName: 'n',
        timeoutStrategy: 'optimistic',
        personalAccessToken: 'tok',
        repoId: 12,
        targetNamespace: 'ns',
      },
    });
  });

  it('should work without options', async () => {
    await service.importGithubRepository('tok', 12, 'ns');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/github', {
      sudo: undefined,
      showExpanded: undefined,
      body: { personalAccessToken: 'tok', repoId: 12, targetNamespace: 'ns' },
    });
  });
});

describe('Import.cancelGithubRepositoryImport', () => {
  it('should request POST /import/github/cancel', async () => {
    await service.cancelGithubRepositoryImport(5, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/github/cancel', {
      sudo: 'u',
      showExpanded: true,
      body: { projectId: 5 },
    });
  });
});

describe('Import.importGithubGists', () => {
  it('should request POST /import/github/gists', async () => {
    await service.importGithubGists('tok', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/github/gists', {
      sudo: 'u',
      showExpanded: true,
      body: { personalAccessToken: 'tok' },
    });
  });
});

describe('Import.importBitbucketServerRepository', () => {
  it('should request POST /import/bitbucket_server', async () => {
    await service.importBitbucketServerRepository('url', 'user', 'tok', 'PROJ', 'repo', {
      newName: 'n',
      targetNamespace: 'ns',
      sudo: 'u',
      showExpanded: true,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/bitbucket_server', {
      sudo: 'u',
      showExpanded: true,
      body: {
        newName: 'n',
        targetNamespace: 'ns',
        bitbucketServerUrl: 'url',
        bitbucketServerUsername: 'user',
        personalAccessToken: 'tok',
        bitbucketServerProject: 'PROJ',
        bitbucketServerRepo: 'repo',
      },
    });
  });
});

describe('Import.importBitbucketCloudRepository', () => {
  it('should request POST /import/bitbucket', async () => {
    await service.importBitbucketCloudRepository('ws/repo', 'ns', {
      bitbucketEmail: 'e',
      bitbucketApiToken: 't',
      sudo: 'u',
      showExpanded: true,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'import/bitbucket', {
      sudo: 'u',
      showExpanded: true,
      body: {
        bitbucketEmail: 'e',
        bitbucketApiToken: 't',
        repoPath: 'ws/repo',
        targetNamespace: 'ns',
      },
    });
  });
});
