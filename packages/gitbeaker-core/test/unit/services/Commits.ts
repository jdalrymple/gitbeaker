import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { Commits } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Commits;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new Commits({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Commits service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Commits);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Commits.all', () => {
  it('should request GET /projects/:id/repository/commits', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits',
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

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/repository/commits', {
      branch: 'master',
      commitMessage: 'Test API commit creation',
      actions: {
        action: 'create',
        filePath: 'foo/bar',
        content: 'some content',
      },
    });
  });
});

describe('Commits.cherryPick', () => {
  it('should request POST projects/:id/repository/commits/:sha/cherry_pick', async () => {
    await service.cherryPick(1, '5a', 'master');

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/1/repository/commits/5a/cherry_pick',
      {
        branch: 'master',
      },
    );
  });
});
