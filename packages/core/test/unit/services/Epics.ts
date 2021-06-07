import { RequestHelper } from '../../../src/infrastructure';
import { Epics } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Epics;

beforeEach(() => {
  service = new Epics({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Epics service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(Epics);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Epics.all', () => {
  it('should request GET /groups/:id/epics', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics', undefined);
  });
});

describe('Epics.create', () => {
  it('should request POST /groups/:id/epics', async () => {
    await service.create(1, 'test epic');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics', {
      title: 'test epic',
    });
  });
});

describe('Epics.edit', () => {
  it('should request PUT /groups/:id/epics', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2', undefined);
  });
});

describe('Epics.show', () => {
  it('should request GET /groups/:id/epics/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics/2', undefined);
  });
});

describe('Epics.remove', () => {
  it('should request DEL /groups/:id/epics/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/epics/2', undefined);
  });
});
