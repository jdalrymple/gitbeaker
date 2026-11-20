import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Suggestions } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Suggestions;

beforeEach(() => {
  service = new Suggestions({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Suggestions.apply', () => {
  it('should request PUT /suggestions/:id/apply', async () => {
    await service.apply(1, { commitMessage: 'msg', sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'suggestions/1/apply', {
      sudo: 'u',
      showExpanded: true,
      body: { commitMessage: 'msg' },
    });
  });

  it('should work without options', async () => {
    await service.apply(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'suggestions/1/apply', {
      sudo: undefined,
      showExpanded: undefined,
      body: {},
    });
  });
});

describe('Suggestions.applyBatch', () => {
  it('should request PUT /suggestions/batch_apply', async () => {
    await service.applyBatch([1, 2], { commitMessage: 'msg', sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'suggestions/batch_apply', {
      sudo: 'u',
      showExpanded: true,
      body: { commitMessage: 'msg', ids: [1, 2] },
    });
  });

  it('should work without options', async () => {
    await service.applyBatch([1]);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'suggestions/batch_apply', {
      sudo: undefined,
      showExpanded: undefined,
      body: { ids: [1] },
    });
  });
});
