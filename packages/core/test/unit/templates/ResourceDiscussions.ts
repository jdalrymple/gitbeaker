import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../../../src/templates';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceDiscussions;

beforeEach(() => {
  service = new ResourceDiscussions('resource1', 'resource2', {
    requesterFn: vi.fn<RequesterFn>(),
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
    await service.addNote(1, 2, 3, 'test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/resource2/2/discussions/3/notes',
      {
        body: { body: 'test' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ResourceCustomAttributes.all', () => {
  it('should call the correct url with a resource id', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/resource2/2/discussions', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceDiscussions.create', () => {
  it('should call the correct url', async () => {
    await service.create(1, 2, 'test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/resource2/2/discussions', {
      body: { body: 'test' },
      showExpanded: undefined,
      sudo: undefined,
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

    const formData = new FormData();
    formData.append('body', 'test');
    formData.append('position[base_sha]', 'sha1');
    formData.append('position[start_sha]', 'sha2');
    formData.append('position[head_sha]', 'sha3');
    formData.append('position[position_type]', 'text');
    formData.append('position[new_line]', '1');
    formData.append('position[new_path]', 'index.js');
    formData.append('position[line_range][start][type]', 'new');
    formData.append('position[line_range][start][line_code]', '1');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, '1/resource2/2/discussions', {
      body: formData,
      showExpanded: undefined,
      sudo: undefined,
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
        body: { body: 'test' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should PUT request 1/resource2/2/discussions/3/notes/4 with empty searchParams parameters and a resolved: true body payload', async () => {
    await service.editNote(1, 2, 3, 4, { resolved: true });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      '1/resource2/2/discussions/3/notes/4',
      {
        body: { resolved: true },
        showExpanded: undefined,
        sudo: undefined,
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
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ResourceDiscussions.show', () => {
  it('should call the correct url', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/resource2/2/discussions/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
