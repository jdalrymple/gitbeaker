import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Helm } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Helm;

beforeEach(() => {
  service = new Helm({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Helm.downloadChartIndex', () => {
  it('should request GET /projects/:id/packages/helm/:channel/index.yaml', async () => {
    await service.downloadChartIndex(1, 'stable');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/helm/stable/index.yaml',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Helm.downloadChart', () => {
  it('should request GET /projects/:id/packages/helm/:channel/charts/:filename.tgz', async () => {
    await service.downloadChart(1, 'stable', 'mychart-1.0.0', { sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/helm/stable/charts/mychart-1.0.0.tgz',
      { showExpanded: undefined, sudo: 'u' },
    );
  });
});

describe('Helm.uploadChart', () => {
  it('should request POST /projects/:id/packages/helm/api/:channel/charts', async () => {
    const content = new Blob(['chart'], { type: 'application/gzip' });

    await service.uploadChart(1, 'stable', { content, filename: 'chart.tgz' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/helm/api/stable/charts',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      chart: expect.objectContaining({ name: 'chart.tgz', size: content.size }),
    });
  });
});

describe('Helm.import', () => {
  it('should delegate to uploadChart', async () => {
    const content = new Blob(['chart']);

    await service.import(1, 'stable', { content, filename: 'chart.tgz' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/helm/api/stable/charts',
      expect.objectContaining({ body: expect.any(FormData) }),
    );
  });
});
