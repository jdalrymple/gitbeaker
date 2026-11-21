import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ExternalControls } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ExternalControls;

beforeEach(() => {
  service = new ExternalControls({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ExternalControls.setStatus', () => {
  it('should request PATCH /projects/:id/compliance_external_controls/:id/status without options', async () => {
    await service.setStatus(1, 2, 'pass');

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      expect.anything(),
      'projects/1/compliance_external_controls/2/status',
      {
        body: { status: 'pass' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should send HMAC headers on a cloned service when provided', async () => {
    await service.setStatus(1, 2, 'fail', {
      timestamp: 'ts',
      nonce: 'n',
      hmacSignature: 'sig',
    });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Gitlab-Timestamp': 'ts',
          'X-Gitlab-Nonce': 'n',
          'X-Gitlab-Hmac-Sha256': 'sig',
        }),
      }),
      'projects/1/compliance_external_controls/2/status',
      {
        body: { status: 'fail' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
