import { ResourceWeightEvents } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceWeightEvents;

beforeEach(() => {
  service = new ResourceWeightEvents('resource', 'resource2', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceWeightEvents service', () => {
  it('should create a valid service object with the correct prefix', () => {
    expect(service).toBeInstanceOf(ResourceWeightEvents);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceWeightEvents.all', () => {
  it('should call the correct url for getting all access requests with a string identifer', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/resource_weight_events',
      undefined,
    );
  });
});

describe('ResourceWeightEvents.show', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.show(1, 2, 3);
    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/resource_weight_events/3',
      undefined,
    );
  });
});
