import { GitlabPages } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GitlabPages;

beforeEach(() => {
  service = new GitlabPages({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('GitlabPages.remove', () => {
  it('should request DEL /projects/1/pages', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/pages', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
