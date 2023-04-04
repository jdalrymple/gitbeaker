import { RequestHelper } from '../../../src/infrastructure';
import { Commits } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Commits;

beforeEach(() => {
  service = new Commits({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Commits.all', () => {
  it('should request GET /projects/:id/repository/commits', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits',
      undefined,
    );
  });
});

describe('Commits.cherryPick', () => {
  it('should request POST projects/:id/repository/commits/:sha/cherry_pick', async () => {
    await service.cherryPick(1, '5a', 'master');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/cherry_pick',
      {
        branch: 'master',
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
      branch: 'master',
      commitMessage: 'Test API commit creation',
      actions: [
        {
          action: 'create',
          filePath: 'foo/bar',
          content: 'some content',
        },
      ],
    });
  });

  it('should request POST /projects/:id/repository/commits without actions', async () => {
    await service.create(1, 'master', 'Test API commit creation');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/commits', {
      branch: 'master',
      commitMessage: 'Test API commit creation',
      actions: [],
    });
  });
});

describe('Commits.createComment', () => {
  it('should request POST projects/:id/repository/commits/:sha/comments', async () => {
    await service.createComment(1, '5a', 'note');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/comments',
      { note: 'note' },
    );
  });
});

describe('Commits.showDiff', () => {
  it('should request GET projects/:id/repository/commits/:sha/diff', async () => {
    await service.showDiff(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/diff',
      undefined,
    );
  });
});

describe('Commits.editStatus', () => {
  it('should request POST projects/:id/statuses/:ref', async () => {
    await service.editStatus(1, '5a', 'pending');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/statuses/5a', undefined);
  });
});

describe('Commits.allReferences', () => {
  it('should request GET projects/:id/repository/commits/:sha/refs', async () => {
    await service.allReferences(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/refs',
      undefined,
    );
  });
});

describe('Commits.show', () => {
  it('should request GET projects/:id/repository/commits/:sha', async () => {
    await service.show(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a',
      undefined,
    );
  });
});

describe('Commits.allStatuses', () => {
  it('should request GET projects/:id/repository/commits/:sha/statuses', async () => {
    await service.allStatuses(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/statuses',
      undefined,
    );
  });
});

describe('Commits.allMergeRequests', () => {
  it('should request GET projects/:id/repository/commits/:sha/statuses', async () => {
    await service.allMergeRequests(1, '5a');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/merge_requests',
      undefined,
    );
  });
});
