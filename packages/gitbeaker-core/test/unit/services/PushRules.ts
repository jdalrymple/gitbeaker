import { PushRules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: PushRules;

beforeEach(() => {
  service = new PushRules({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

// the feature is not available for CE users https://gitlab.com/gitlab-org/gitlab-ee/issues/3825

describe('Instantiating PushRules service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(PushRules);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
  });
});

describe('PushRules.create', () => {
  it('should request PUT projects/:id/push_rule', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/push_rule', { prop: 1 });
  });
});

describe('PushRules.edit', () => {
  it('should request PUT projects/:id/push_rule', async () => {
    await service.edit(1, {
      memberCheck: true,
    });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/push_rule', {
      memberCheck: true,
    });
  });
});

describe('PushRules.remove', () => {
  it('should request DELETE projects/:id/push_rule', async () => {
    await service.remove(1);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/push_rule', undefined);
  });
});

describe('PushRules.show', () => {
  it('should request GET projects/:id/push_rule', async () => {
    await service.show(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/push_rule', undefined);
  });
});
