import { RequestHelper } from '../../../src/infrastructure';
import { UserEmails } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: UserEmails;

beforeEach(() => {
  service = new UserEmails({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating UserEmails service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(UserEmails);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('UserEmails.all', () => {
  it('should request GET /user/emails', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/emails', {});
  });

  it('should request GET /users/:id/emails', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/emails', {});
  });
});

describe('UserEmails.add', () => {
  it('should request POST /user/emails', async () => {
    await service.add('email');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/emails', {
      email: 'email',
    });
  });

  it('should request POST /users/:id/emails', async () => {
    await service.add('email', { userId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/emails', {
      email: 'email',
    });
  });
});

describe('UserEmails.show', () => {
  it('should request GET /user/emails/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/emails/1', undefined);
  });
});

describe('UserEmails.remove', () => {
  it('should request DEL /users/:id/emails/:id', async () => {
    await service.remove(2, { userId: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/emails/2', {});
  });

  it('should request DEL /user/emails/:id', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'user/emails/2', {});
  });
});
