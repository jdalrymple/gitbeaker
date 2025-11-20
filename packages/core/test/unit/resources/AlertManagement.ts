import { AlertManagement } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: AlertManagement;

beforeEach(() => {
  service = new AlertManagement({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Agents.allMetricImages', () => {
  it('should request GET /projects/1/alert_management_alerts/2/metric_images without options', async () => {
    await service.allMetricImages(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Agents.editMetricImage', () => {
  it('should request PUT /projects/1/alert_management_alerts/2/metric_images', async () => {
    await service.editMetricImage(1, 2, 3, {
      url: 'url',
    });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images/3',
      {
        body: {
          url: 'url',
          urlText: undefined,
        },
      },
    );
  });
});

describe('Agents.removeMetricImage', () => {
  it('should request DEL /projects/1/alert_management_alerts/2/metric_images', async () => {
    await service.removeMetricImage(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Agents.uploadMetricImage', () => {
  it('should request POST /projects/1/alert_management_alerts/2/metric_images', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    const image = { content, filename: 'image.jpeg' };

    await service.uploadMetricImage(1, 2, image, { urlText: 'text' });

    const expectedFormData = new FormData();
    expectedFormData.append('file', content, 'image.jpeg');
    expectedFormData.append('urlText', 'text');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images',
      {
        body: expectedFormData,
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
