import { CommitDiscussions } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: CommitDiscussions;

beforeEach(() => {
  service = new CommitDiscussions({
    requesterFn: mockRequesterFn,
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
