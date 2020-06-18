import { RequesterType } from '@gitbeaker/requester-utils';
import { ProjectSnippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ProjectSnippets;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new ProjectSnippets({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ProjectSnippets service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ProjectSnippets);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ProjectSnippets.all', () => {
  it('should request GET /projects/:id/snippets', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/snippets', undefined);
  });
});

describe('ProjectSnippets.content', () => {
  it('should request GET /projects/:id/snippets/:id/raw', async () => {
    await service.content(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/snippets/2/raw', undefined);
  });
});

describe('ProjectSnippets.create', () => {
  it('should request POST /projects/:id/snippets', async () => {
    await service.create(1, 'This is a snippet', 'test.txt', 'Hello world', 'internal', {
      description: 'Hello World snippet',
    });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/snippets', {
      title: 'This is a snippet',
      fileName: 'test.txt',
      code: 'Hello world',
      visibility: 'internal',
      description: 'Hello World snippet',
    });
  });
});

describe('ProjectSnippets.edit', () => {
  it('should request PUT /projects/:id/snippets', async () => {
    await service.edit(1, 2, { name: 'test snippet 2' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/snippets/2', {
      name: 'test snippet 2',
    });
  });
});

describe('ProjectSnippets.remove', () => {
  it('should request DELETE /projects/:id/snippets/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/snippets/2', undefined);
  });
});

describe('ProjectSnippets.show', () => {
  it('should request GET /projects/:id/snippets/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/snippets/2', undefined);
  });
});

describe('ProjectSnippets.userAgentDetails', () => {
  it('should request GET /projects/:id/snippets/:id/user_agent_detail', async () => {
    await service.userAgentDetails(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/snippets/2/user_agent_detail',
      undefined,
    );
  });
});
