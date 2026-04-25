import { Epics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Epics;

beforeEach(() => {
  service = new Epics({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Epics.all', () => {
  it('should request GET /groups/:id/epics', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Epics.create', () => {
  it('should request POST /groups/:id/epics', async () => {
    await service.create(1, 'test epic');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics', {
      body: {
        title: 'test epic',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Epics.edit', () => {
  it('should request PUT /groups/:id/epics', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Epics.show', () => {
  it('should request GET /groups/:id/epics/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/epics/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Epics.remove', () => {
  it('should request DEL /groups/:id/epics/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/epics/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
