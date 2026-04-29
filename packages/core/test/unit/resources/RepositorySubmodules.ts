import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RepositorySubmodules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: RepositorySubmodules;

beforeEach(() => {
  service = new RepositorySubmodules({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Releases.edit', () => {
  it('should request PUT /projects/:id/repository/submodules/:submodule', async () => {
    await service.edit(1, 'submod', 'branch', 'sha');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/submodules/submod',
      {
        body: {
          branch: 'branch',
          commitSha: 'sha',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
