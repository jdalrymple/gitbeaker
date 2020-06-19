import { RequesterType } from '@gitbeaker/requester-utils';
import { CommitDiscussions } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: CommitDiscussions;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new CommitDiscussions({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating CommitDiscussions service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(CommitDiscussions);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});
