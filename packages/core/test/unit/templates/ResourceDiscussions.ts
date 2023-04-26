import { ResourceDiscussions } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceDiscussions;

beforeEach(() => {
  service = new ResourceDiscussions('resource1', 'resource2', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Instantiating ResourceDiscussions service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceDiscussions);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
  });
});

describe('ResourceDiscussions.addNote', () => {
  it('should call the correct url', async () => {
    await service.addNote(1, 2, 3, 4, 'test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes',
      {
        noteId: 4,
        searchParams: {
          body: 'test',
        },
      },
    );
  });
});

describe('ResourceCustomAttributes.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions',
      undefined,
    );
  });
});

describe('ResourceDiscussions.create', () => {
  it('should call the correct url', async () => {
    await service.create(1, 2, 'test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/resource2/2/discussions', {
      searchParams: {
        body: 'test',
      },
    });
  });
});

describe('ResourceDiscussions.editNote', () => {
  it('should PUT request 1/resource2/2/discussions/3/notes/4 with a body=test searchParams parameter', async () => {
    await service.editNote(1, 2, 3, 4, { body: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes/4',
      {
        searchParams: {
          body: 'test',
        },
      },
    );
  });

  it('should PUT request 1/resource2/2/discussions/3/notes/4 with empty searchParams parameters and a resolved: true body payload', async () => {
    await service.editNote(1, 2, 3, 4, { resolved: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes/4',
      {
        searchParams: {},
        resolved: true,
      },
    );
  });
});

describe('ResourceDiscussions.removeNote', () => {
  it('should call the correct url', async () => {
    await service.removeNote(1, 2, 3, 4);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes/4',
      undefined,
    );
  });
});

describe('ResourceDiscussions.show', () => {
  it('should call the correct url', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3',
      undefined,
    );
  });
});
