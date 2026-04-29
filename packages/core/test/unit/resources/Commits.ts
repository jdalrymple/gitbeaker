import { Commits } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Commits;

beforeEach(() => {
  service = new Commits({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Commits.all', () => {
  it('should request GET /projects/:id/repository/commits', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/commits', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Commits.cherryPick', () => {
  it('should request POST projects/:id/repository/commits/:sha/cherry_pick', async () => {
    await service.cherryPick(1, '5a', 'master');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/cherry_pick',
      {
        body: {
          branch: 'master',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Commits.allComments', () => {
  it('should request POST projects/:id/repository/commits/:sha/comments', async () => {
    await service.allComments(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/comments',
      undefined,
    );
  });
});

describe('Commits.create', () => {
  it('should request POST /projects/:id/repository/commits with given properties', async () => {
    await service.create(1, 'master', 'Test API commit creation', [
      {
        action: 'create',
        filePath: 'foo/bar',
        content: 'some content',
      },
    ]);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/commits', {
      body: {
        branch: 'master',
        commitMessage: 'Test API commit creation',
        actions: [
          {
            action: 'create',
            filePath: 'foo/bar',
            content: 'some content',
          },
        ],
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects/:id/repository/commits without actions', async () => {
    await service.create(1, 'master', 'Test API commit creation');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/commits', {
      body: {
        branch: 'master',
        commitMessage: 'Test API commit creation',
        actions: [],
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Commits.createComment', () => {
  it('should request POST projects/:id/repository/commits/:sha/comments', async () => {
    await service.createComment(1, '5a', 'note');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/comments',
      {
        body: { note: 'note' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Commits.showDiff', () => {
  it('should request GET projects/:id/repository/commits/:sha/diff', async () => {
    await service.showDiff(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/diff',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Commits.editStatus', () => {
  it('should request POST projects/:id/statuses/:ref', async () => {
    await service.editStatus(1, '5a', 'pending');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/statuses/5a', {
      body: {
        state: 'pending',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Commits.allReferences', () => {
  it('should request GET projects/:id/repository/commits/:sha/refs', async () => {
    await service.allReferences(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/refs',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Commits.show', () => {
  it('should request GET projects/:id/repository/commits/:sha', async () => {
    await service.show(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/commits/5a', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Commits.allStatuses', () => {
  it('should request GET projects/:id/repository/commits/:sha/statuses', async () => {
    await service.allStatuses(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/statuses',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Commits.allMergeRequests', () => {
  it('should request GET projects/:id/repository/commits/:sha/statuses', async () => {
    await service.allMergeRequests(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/merge_requests',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Commits.showSequence', () => {
  it('should request GET projects/:id/repository/commits/:sha/sequence', async () => {
    await service.showSequence(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/sequence',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET projects/:id/repository/commits/:sha/sequence with firstParent option', async () => {
    await service.showSequence(1, '5a', { firstParent: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/sequence',
      {
        searchParams: { firstParent: true },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
