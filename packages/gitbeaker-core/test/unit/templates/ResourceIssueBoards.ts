import { ResourceIssueBoards } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ResourceIssueBoards;

beforeEach(() => {
  service = new ResourceIssueBoards('resource', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceIssueBoards service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceIssueBoards);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceIssueBoards.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all('5');

    expect(RequestHelper.get).toBeCalledWith(service, '5/boards', undefined);
  });
});

describe('ResourceIssueBoards.create', () => {
  it('should call the correct url with a resource id when given new board name', async () => {
    await service.create('5', 'todo');

    expect(RequestHelper.post).toBeCalledWith(service, '5/boards', {
      name: 'todo',
    });
  });
});

describe('ResourceIssueBoards.createList', () => {
  it('should call the correct url with a resource id, board id and label id', async () => {
    await service.createList('5', 6, 1);

    expect(RequestHelper.post).toBeCalledWith(service, '5/boards/6/lists', {
      labelId: 1,
    });
  });
});

describe('ResourceIssueBoards.edit', () => {
  it('should call the correct url with a resource id and board id', async () => {
    await service.edit('5', 6);

    expect(RequestHelper.put).toBeCalledWith(service, '5/boards/6', undefined);
  });
});

describe('ResourceIssueBoards.editList', () => {
  it('should call the correct url with a resource id, board id, label id and position', async () => {
    await service.editList('5', 6, 1, 2);

    expect(RequestHelper.put).toBeCalledWith(service, '5/boards/6/lists/1', {
      position: 2,
    });
  });
});

describe('ResourceIssueBoards.lists', () => {
  it('should call the correct url with a resource id and board id', async () => {
    await service.lists('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/boards/6/lists', undefined);
  });
});

describe('ResourceIssueBoards.remove', () => {
  it('should call the correct url with a resource id and board id', async () => {
    await service.remove('5', 6);

    expect(RequestHelper.del).toBeCalledWith(service, '5/boards/6', undefined);
  });
});

describe('ResourceIssueBoards.removeList', () => {
  it('should call the correct url with a resource id, board id and list id', async () => {
    await service.removeList('5', 6, 7);

    expect(RequestHelper.del).toBeCalledWith(service, '5/boards/6/lists/7', undefined);
  });
});

describe('ResourceIssueBoards.show', () => {
  it('should call the correct url with a resource id and board id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get).toBeCalledWith(service, '5/boards/6', undefined);
  });
});

describe('ResourceIssueBoards.showList', () => {
  it('should call the correct url with a resource id, board id and list id', async () => {
    await service.showList('5', 6, 7);

    expect(RequestHelper.get).toBeCalledWith(service, '5/boards/6/lists/7', undefined);
  });
});
