import { TodoLists } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: TodoLists;

beforeEach(() => {
  service = new TodoLists({
    requesterFn: jest.fn(),
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
