import { IssueLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: IssueLinks;

beforeEach(() => {
  service = new IssueLinks({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('IssueLinks.all', () => {
  it('should request GET projects/:id/issues/:id/links', async () => {
    await service.all(8, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
