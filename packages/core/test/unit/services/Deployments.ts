import { RequestHelper } from '../../../src/infrastructure';
import { Deployments } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Deployments;

beforeEach(() => {
  service = new Deployments({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Deployments service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Deployments);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Deployments.all', () => {
  it('should request GET /projects/:id/deployments', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deployments', undefined);
  });
});

describe('Deployments.show', () => {
  it('should request GET /projects/:id/deployments/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/deployments/2',
      undefined,
    );
  });
});

describe('Deployments.mergeRequests', () => {
  it('should request GET /projects/:id/deployments/:id/merge_requests', async () => {
    await service.mergeRequests(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/deployments/2/merge_requests',
      undefined,
    );
  });
});
