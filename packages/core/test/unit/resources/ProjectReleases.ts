import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectReleases } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectReleases;

beforeEach(() => {
  service = new ProjectReleases({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectReleases.all', () => {
  it('should request GET /projects/:id/releases', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/releases', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.create', () => {
  it('should request POST /projects/:id/releases', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/releases', {
      body: { prop: 1 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.edit', () => {
  it('should request PUT /projects/:id/releases', async () => {
    await service.edit(1, '2');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/releases/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.show', () => {
  it('should request GET /projects/:id/releases/:id', async () => {
    await service.show(1, '2');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/releases/2', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.remove', () => {
  it('should request DEL /projects/:id/releases/:id', async () => {
    await service.remove(1, '2');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/releases/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.all with options', () => {
  it('should pass options as search params', async () => {
    await service.all(1, { orderBy: 'created_at', sort: 'asc', maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/releases', {
      maxPages: 2,
      searchParams: { orderBy: 'created_at', sort: 'asc' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.createEvidence', () => {
  it('should request POST /projects/:id/releases/:tag/evidence', async () => {
    await service.createEvidence(1, 'v1');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/releases/v1/evidence',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectReleases.download', () => {
  it('should request GET /projects/:id/releases/:tag/downloads/:path', async () => {
    await service.download(1, 'v1', 'bin/app');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/releases/v1/downloads/bin%2Fapp',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectReleases.downloadLatest', () => {
  it('should request GET /projects/:id/releases/permalink/latest/downloads/:path', async () => {
    await service.downloadLatest(1, 'bin/app');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/releases/permalink/latest/downloads/bin%2Fapp',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectReleases.show with options', () => {
  it('should pass includeHtmlDescription as search param', async () => {
    await service.show(1, '2', { includeHtmlDescription: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/releases/2', {
      searchParams: { includeHtmlDescription: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.showLatest', () => {
  it('should request GET /projects/:id/releases/permalink/latest', async () => {
    await service.showLatest(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/releases/permalink/latest',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectReleases.showLatestEvidence', () => {
  it('should request GET /projects/:id/releases/permalink/latest/evidence', async () => {
    await service.showLatestEvidence(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/releases/permalink/latest/evidence',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
