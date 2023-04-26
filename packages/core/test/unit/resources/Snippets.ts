import { Snippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Snippets;

beforeEach(() => {
  service = new Snippets({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Snippets.all', () => {
  it('should request GET /snippets', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets', {});
  });

  it('should request GET /snippets/public', async () => {
    await service.all({ public: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/public', {});
  });
});

describe('Snippets.showContent', () => {
  it('should request GET /snippets/:id/raw', async () => {
    await service.showContent(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/12/raw', undefined);
  });
});

describe('Snippets.create', () => {
  it('should request POST /snippets', async () => {
    await service.create('This is a snippet', {
      visibility: 'internal',
      description: 'Hello World snippet',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'snippets', {
      title: 'This is a snippet',
      visibility: 'internal',
      description: 'Hello World snippet',
    });
  });
});

describe('Snippets.edit', () => {
  it('should request PUT /snippets', async () => {
    await service.edit(12, { description: 'test snippet 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'snippets/12', {
      description: 'test snippet 2',
    });
  });
});

describe('Snippets.show', () => {
  it('should request GET /snippets/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/12', undefined);
  });
});

describe('Snippets.remove', () => {
  it('should request DELETE /snippets/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'snippets/12', undefined);
  });
});

describe('Snippets.showUserAgentDetails', () => {
  it('should request GET /snippets/:id/user_agent_detail', async () => {
    await service.showUserAgentDetails(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'snippets/12/user_agent_detail',
      undefined,
    );
  });
});
