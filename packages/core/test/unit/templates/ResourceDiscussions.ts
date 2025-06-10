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
        body: 'test',
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
      body: 'test',
    });
  });

  it('should support camelCased position arguments', async () => {
    await service.create(1, 2, 'test', {
      position: {
        baseSha: 'sha1',
        startSha: 'sha2',
        headSha: 'sha3',
        positionType: 'text',
        newLine: '1',
        newPath: 'index.js',
        lineRange: {
          start: {
            type: 'new',
            lineCode: '1',
          },
        },
      },
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/resource2/2/discussions', {
      body: 'test',
      isForm: true,
      'position[base_sha]': 'sha1',
      'position[start_sha]': 'sha2',
      'position[head_sha]': 'sha3',
      'position[position_type]': 'text',
      'position[new_line]': '1',
      'position[new_path]': 'index.js',
      'position[line_range][start][type]': 'new',
      'position[line_range][start][line_code]': '1',
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
        body: 'test',
      },
    );
  });

  it('should PUT request 1/resource2/2/discussions/3/notes/4 with empty searchParams parameters and a resolved: true body payload', async () => {
    await service.editNote(1, 2, 3, 4, { resolved: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes/4',
      {
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
