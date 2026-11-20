import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Lint } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Lint;

beforeEach(() => {
  service = new Lint({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Lint.check', () => {
  it('should request GET /projects/1/ci/lint', async () => {
    await service.check(1, { ref: 'main', includeJobs: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/ci/lint', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { ref: 'main', includeJobs: true },
    });
  });
});

describe('Lint.lint', () => {
  it('should request POST /projects/1/ci/lint', async () => {
    await service.lint(1, 'content', { dryRun: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/ci/lint', {
      sudo: undefined,
      showExpanded: undefined,
      body: { dryRun: true, content: 'content' },
    });
  });
});
