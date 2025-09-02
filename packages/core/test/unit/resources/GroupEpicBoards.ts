import { GroupEpicBoards } from '../../../src/resources';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: GroupEpicBoards;

beforeEach(() => {
  service = new GroupEpicBoards({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GroupEpicBoards.all', () => {
  it('should call the correct url with a group id', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epic_boards', undefined);
  });
});

describe('GroupEpicBoards.allLists', () => {
  it('should call the correct url with a group id and board id', async () => {
    await service.allLists('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/5/epic_boards/6/lists',
      undefined,
    );
  });
});

describe('GroupEpicBoards.show', () => {
  it('should call the correct url with a group id and board id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/epic_boards/6', undefined);
  });
});

describe('GroupEpicBoards.showList', () => {
  it('should call the correct url with a group id, board id and list id', async () => {
    await service.showList('5', 6, 7);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/5/epic_boards/6/lists/7',
      undefined,
    );
  });
});
