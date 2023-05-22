import { ProjectSnippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProjectSnippets;

beforeEach(() => {
  service = new ProjectSnippets({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectSnippets.all', () => {
  it('should request GET /projects/:id/snippets', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/snippets', undefined);
  });
});

describe('ProjectSnippets.showContent', () => {
  it('should request GET /projects/:id/snippets/:id/raw', async () => {
    await service.showContent(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/snippets/2/raw',
      undefined,
    );
  });
});

describe('ProjectSnippets.create', () => {
  it('should request POST /projects/:id/snippets', async () => {
    await service.create(1, 'This is a snippet', {
      description: 'Hello World snippet',
      visibility: 'internal',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/snippets', {
      title: 'This is a snippet',
      visibility: 'internal',
      description: 'Hello World snippet',
    });
  });
});

describe('ProjectSnippets.edit', () => {
  it('should request PUT /projects/:id/snippets', async () => {
    await service.edit(1, 2, { description: 'test snippet 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/snippets/2', {
      description: 'test snippet 2',
    });
  });
});

describe('ProjectSnippets.remove', () => {
  it('should request DELETE /projects/:id/snippets/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/snippets/2', undefined);
  });
});

describe('ProjectSnippets.show', () => {
  it('should request GET /projects/:id/snippets/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/snippets/2', undefined);
  });
});

describe('ProjectSnippets.showUserAgentDetails', () => {
  it('should request GET /projects/:id/snippets/:id/user_agent_detail', async () => {
    await service.showUserAgentDetails(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/snippets/2/user_agent_detail',
      undefined,
    );
  });
});
