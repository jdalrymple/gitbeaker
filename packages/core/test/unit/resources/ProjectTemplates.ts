import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectTemplates } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectTemplates;

beforeEach(() => {
  service = new ProjectTemplates({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectTemplates.all', () => {
  it('should request GET /projects/:id/templates/:type', async () => {
    await service.all(1, 'licenses', { perPage: 2, maxPages: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/templates/licenses', {
      maxPages: 1,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectTemplates.show', () => {
  it('should request GET /projects/:id/templates/:type/:name', async () => {
    await service.show(1, 'licenses', 'mit');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/templates/licenses/mit', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass optional search params', async () => {
    await service.show(1, 'licenses', 'mit', {
      project: 'p',
      fullname: 'Me',
      sourceTemplateProjectId: 9,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/templates/licenses/mit', {
      searchParams: { project: 'p', fullname: 'Me', sourceTemplateProjectId: 9 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
