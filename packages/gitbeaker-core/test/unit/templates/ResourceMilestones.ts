import { ResourceMilestones } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ResourceMilestones;

beforeEach(() => {
  service = new ResourceMilestones('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceMilestones service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceMilestones);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceMilestones.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get).toBeCalledWith(service, '5/milestones', undefined);
  });
});

describe('ResourceMilestones.create', () => {
  it('should call the correct url with a resource id', async () => {
    await service.create('5', 'sprint');

    expect(RequestHelper.post).toBeCalledWith(service, '5/milestones', { title: 'sprint' });
  });
});

describe('ResourceMilestones.edit', () => {
  it('should call the correct url with a resource id and milestone id', async () => {
    await service.edit('5', 6);

    expect(RequestHelper.put).toBeCalledWith(service, '5/milestones/6', undefined);
  });
});

describe('ResourceMilestones.issues', () => {
  it('should call the correct url with a resource id', async () => {
    await service.issues('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/milestones/6/issues', undefined);
  });
});

describe('ResourceMilestones.mergeRequests', () => {
  it('should call the correct url with a resource id', async () => {
    await service.mergeRequests('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/milestones/6/merge_requests', undefined);
  });
});

describe('ResourceMilestones.show', () => {
  it('should call the correct url with a resource id and milestone id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/milestones/6', undefined);
  });
});
