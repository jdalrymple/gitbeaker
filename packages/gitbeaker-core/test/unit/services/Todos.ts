import { RequestHelper } from '../../../src/infrastructure';
import { Todos } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Todos;

beforeEach(() => {
  service = new Todos({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Todos service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Todos);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Todos.all', () => {
  it('should request GET /todos', async () => {
    await service.all({ test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'todos', { test: 1 });
  });

  it('should request GET /todos without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'todos', undefined);
  });
});

describe('Todos.create', () => {
  it('should request POST /projects/:project_id/mergerequests/:merge_request_id/todo', async () => {
    await service.create(1, 2, 'mergerequest');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/todo',
      undefined,
    );
  });

  it('should request POST /projects/:project_id/issues/:issue_id/todo', async () => {
    await service.create(1, 2, 'issue');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/todo',
      undefined,
    );
  });

  it('should request POST /projects/:project_id/issues/:issue_id/todo with options', async () => {
    await service.create(1, 2, 'issue', { sudo: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/todo', {
      sudo: 1,
    });
  });

  it('should request POST /projects/:project_id/mergerequests/:merge_request_id/todo with options', async () => {
    await service.create(1, 2, 'mergerequest', { sudo: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/merge_requests/2/todo', {
      sudo: 1,
    });
  });
});

describe('Todos.done', () => {
  it('should request POST /todos', async () => {
    await service.done();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'todos/mark_as_done', {});
  });

  it('should request POST /todos/1', async () => {
    await service.done({ todoId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'todos/1/mark_as_done', {});
  });
});
