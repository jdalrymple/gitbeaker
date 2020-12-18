import { Snippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Snippets;

beforeEach(() => {
  service = new Snippets({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Snippets service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Snippets);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Snippets.all', () => {
  it('should request GET /snippets', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'snippets', {});
  });

  it('should request GET /snippets/public', async () => {
    await service.all({ public: true });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'snippets/public', {});
  });
});

describe('Snippets.content', () => {
  it('should request GET /snippets/:id/raw', async () => {
    await service.content(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'snippets/12/raw', undefined);
  });
});

describe('Snippets.create', () => {
  it('should request POST /snippets', async () => {
    await service.create('This is a snippet', 'test.txt', 'Hello world', 'internal', {
      description: 'Hello World snippet',
    });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'snippets', {
      title: 'This is a snippet',
      fileName: 'test.txt',
      content: 'Hello world',
      visibility: 'internal',
      description: 'Hello World snippet',
    });
  });
});

describe('Snippets.edit', () => {
  it('should request PUT /snippets', async () => {
    await service.edit(12, { name: 'test snippet 2' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'snippets/12', {
      name: 'test snippet 2',
    });
  });
});

describe('Snippets.show', () => {
  it('should request GET /snippets/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'snippets/12', undefined);
  });
});

describe('Snippets.remove', () => {
  it('should request DELETE /snippets/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'snippets/12', undefined);
  });
});

describe('Snippets.userAgentDetails', () => {
  it('should request GET /snippets/:id/user_agent_detail', async () => {
    await service.userAgentDetails(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'snippets/12/user_agent_detail',
      undefined,
    );
  });
});
