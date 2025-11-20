import { ProjectSnippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: ProjectSnippets;

beforeEach(() => {
  service = new ProjectSnippets({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectSnippets.all', () => {
  it('should request GET /projects/:id/snippets', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/snippets', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.showContent', () => {
  it('should request GET /projects/:id/snippets/:id/raw', async () => {
    await service.showContent(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/snippets/2/raw', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.create', () => {
  it('should request POST /projects/:id/snippets', async () => {
    await service.create(1, 'This is a snippet', {
      description: 'Hello World snippet',
      visibility: 'internal',
    });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/snippets', {
      body: {
        title: 'This is a snippet',
        visibility: 'internal',
        description: 'Hello World snippet',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.edit', () => {
  it('should request PUT /projects/:id/snippets', async () => {
    await service.edit(1, 2, { description: 'test snippet 2' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/snippets/2', {
      body: { description: 'test snippet 2' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.remove', () => {
  it('should request DELETE /projects/:id/snippets/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/snippets/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.show', () => {
  it('should request GET /projects/:id/snippets/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/snippets/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectSnippets.showUserAgentDetails', () => {
  it('should request GET /projects/:id/snippets/:id/user_agent_detail', async () => {
    await service.showUserAgentDetails(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/snippets/2/user_agent_detail',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
