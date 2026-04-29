import { TodoLists } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: TodoLists;

beforeEach(() => {
  service = new TodoLists({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('TodoLists.all', () => {
  it('should request GET /todos', async () => {
    await service.all({ authorId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'todos', {
      maxPages: undefined,
      searchParams: { authorId: 1 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /todos without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'todos', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('TodoLists.done', () => {
  it('should request POST /todos', async () => {
    await service.done();

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'todos/mark_as_done', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /todos/1', async () => {
    await service.done({ todoId: 1 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'todos/1/mark_as_done', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
