import { RequestHelper } from '../../../src/infrastructure';
import { BroadcastMessages } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: BroadcastMessages;

beforeEach(() => {
  service = new BroadcastMessages({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating BroadcastMessages service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(BroadcastMessages);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('BroadcastMessages.all', () => {
  it('should request GET /broadcast_messages', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'broadcast_messages', undefined);
  });
});

describe('BroadcastMessages.create', () => {
  it('should request POST /broadcast_messages', async () => {
    await service.create({ prop: 'test epic' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'broadcast_messages', {
      prop: 'test epic',
    });
  });
});

describe('BroadcastMessages.edit', () => {
  it('should request PUT /broadcast_messages', async () => {
    await service.edit(2, { prop: 4 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'broadcast_messages/2', { prop: 4 });
  });
});

describe('BroadcastMessages.remove', () => {
  it('should request DEL /broadcast_messages/:id', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'broadcast_messages/2', undefined);
  });
});

describe('BroadcastMessages.show', () => {
  it('should request GET /broadcast_messages/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'broadcast_messages/1', undefined);
  });
});
