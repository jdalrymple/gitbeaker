import { ResourceAccessTokens } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ResourceAccessTokens;

beforeEach(() => {
  service = new ResourceAccessTokens('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceAccessTokens service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceAccessTokens);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceAccessTokens.all', () => {
  it('should call the correct url for getting all access requests with a string identifer', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens', undefined);
  });

  it('should call the correct url for getting all access requests with a number identifer', async () => {
    await service.all(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens', undefined);
  });
});

describe('ResourceAccessTokens.create', () => {
  it('should call the correct url for creating access token with a string identifer', async () => {
    await service.create('5', 'test', ['api'], '2021-01-31');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens', {
      name: 'test',
      scopes: ['api'],
      expiresAt: '2021-01-31',
    });
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.create(5, 'test', ['api'], '2021-01-31');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens', {
      name: 'test',
      scopes: ['api'],
      expiresAt: '2021-01-31',
    });
  });
});

describe('ResourceAccessTokens.show', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens/6', undefined);
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.show(5, 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens/6', undefined);
  });
});

describe('ResourceAccessTokens.rotate', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.rotate('5', '6');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '5/access_tokens/6/rotate',
      undefined,
    );
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.rotate(5, 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '5/access_tokens/6/rotate',
      undefined,
    );
  });

  it('should take options', async () => {
    const options = { expiresAt: '2021-01-31' };

    await service.rotate('5', '6', options);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens/6/rotate', options);
  });
});

describe('ResourceAccessTokens.revoke', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.revoke('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/access_tokens/6', undefined);
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.revoke(5, 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/access_tokens/6', undefined);
  });
});
