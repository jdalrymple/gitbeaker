import { RequestHelper } from '../../../src/infrastructure';
import { GroupEpicBoards } from '../../../src/resources';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupEpicBoards;

beforeEach(() => {
  service = new GroupEpicBoards({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('GroupEpicBoards.all', () => {
  it('should call the correct url with a group id', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epic_boards', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupEpicBoards.allLists', () => {
  it('should call the correct url with a group id and board id', async () => {
    await service.allLists('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/epic_boards/6/lists', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupEpicBoards.show', () => {
  it('should call the correct url with a group id and board id', async () => {
    await service.show('5', 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/epic_boards/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupEpicBoards.showList', () => {
  it('should call the correct url with a group id, board id and list id', async () => {
    await service.showList('5', 6, 7);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/epic_boards/6/lists/7', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
