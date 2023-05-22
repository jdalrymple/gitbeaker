import { RequestHelper } from '../../../src/infrastructure';
import { TodoLists } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'todos', { authorId: 1 });
  });

  it('should request GET /todos without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'todos', undefined);
  });
});

describe('TodoLists.done', () => {
  it('should request POST /todos', async () => {
    await service.done();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'todos/mark_as_done', {});
  });

  it('should request POST /todos/1', async () => {
    await service.done({ todoId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'todos/1/mark_as_done', {});
  });
});
