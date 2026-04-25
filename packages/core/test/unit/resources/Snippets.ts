import { Snippets } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Snippets;

beforeEach(() => {
  service = new Snippets({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Snippets.all', () => {
  it('should request GET /snippets', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'snippets', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /snippets/public', async () => {
    await service.all({ public: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'snippets/public', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Snippets.showContent', () => {
  it('should request GET /snippets/:id/raw', async () => {
    await service.showContent(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/12/raw', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Snippets.create', () => {
  it('should request POST /snippets', async () => {
    await service.create('This is a snippet', {
      visibility: 'internal',
      description: 'Hello World snippet',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'snippets', {
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

describe('Snippets.edit', () => {
  it('should request PUT /snippets', async () => {
    await service.edit(12, { description: 'test snippet 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'snippets/12', {
      body: {
        description: 'test snippet 2',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Snippets.show', () => {
  it('should request GET /snippets/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/12', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Snippets.remove', () => {
  it('should request DELETE /snippets/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'snippets/12', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Snippets.showUserAgentDetails', () => {
  it('should request GET /snippets/:id/user_agent_detail', async () => {
    await service.showUserAgentDetails(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'snippets/12/user_agent_detail', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
