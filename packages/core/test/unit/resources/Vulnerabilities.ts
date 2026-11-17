import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Vulnerabilities } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Vulnerabilities;

beforeEach(() => {
  service = new Vulnerabilities({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Vulnerabilities.show', () => {
  it('should request GET /vulnerabilities/1', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'vulnerabilities/1', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('Vulnerabilities.confirm', () => {
  it('should request POST /vulnerabilities/1/confirm', async () => {
    await service.confirm(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'vulnerabilities/1/confirm', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('Vulnerabilities.resolve', () => {
  it('should request POST /vulnerabilities/1/resolve', async () => {
    await service.resolve(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'vulnerabilities/1/resolve', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('Vulnerabilities.dismiss', () => {
  it('should request POST /vulnerabilities/1/dismiss', async () => {
    await service.dismiss(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'vulnerabilities/1/dismiss', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('Vulnerabilities.revert', () => {
  it('should request POST /vulnerabilities/1/revert', async () => {
    await service.revert(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'vulnerabilities/1/revert', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});
