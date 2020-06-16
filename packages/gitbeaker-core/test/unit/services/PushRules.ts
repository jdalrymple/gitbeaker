import { RequesterType } from '@gitbeaker/requester-utils';
import { PushRules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: PushRules;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new PushRules({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating PushRules service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(PushRules);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
  });
});

describe('PushRules.edit', () => {
  // the feature is not available for CE users https://gitlab.com/gitlab-org/gitlab-ee/issues/3825
  it('should request PUT projects/:id/push_rule', async () => {
    await service.edit(1, {
      upsert: true,
      memberCheck: true,
    });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/push_rule', {
      upsert: true,
      memberCheck: true,
    });
  });
});
