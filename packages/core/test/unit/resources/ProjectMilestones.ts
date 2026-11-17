import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectMilestones } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectMilestones;

beforeEach(() => {
  service = new ProjectMilestones({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectMilestones.promote', () => {
  it('should request POST :id/milestones/:id/promote', async () => {
    await service.promote(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/milestones/2/promote', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
