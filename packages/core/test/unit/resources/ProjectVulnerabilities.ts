import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectVulnerabilities } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectVulnerabilities;

beforeEach(() => {
  service = new ProjectVulnerabilities({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectVulnerabilities.all', () => {
  it('should request GET /projects/:id/vulnerabilities', async () => {
    await service.all(1, { maxPages: 2, perPage: 5, sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/vulnerabilities', {
      sudo: 'u',
      showExpanded: true,
      maxPages: 2,
      searchParams: { perPage: 5 },
    });
  });

  it('should work without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/vulnerabilities', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: {},
    });
  });
});

describe('ProjectVulnerabilities.create', () => {
  it('should request POST /projects/:id/vulnerabilities', async () => {
    await service.create(1, 9, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/vulnerabilities', {
      sudo: 'u',
      showExpanded: true,
      searchParams: { findingId: 9 },
    });
  });
});
