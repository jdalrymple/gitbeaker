import { GitignoreTemplates } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: GitignoreTemplates;

beforeEach(() => {
  service = new GitignoreTemplates({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating GitignoreTemplates service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(GitignoreTemplates);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});
