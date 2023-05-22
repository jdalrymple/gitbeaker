import { RequestHelper } from '../../../src/infrastructure';
import { AlertManagement } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: AlertManagement;

beforeEach(() => {
  service = new AlertManagement({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Agents.allMetricImages', () => {
  it('should request GET /projects/1/alert_management_alerts/2/metric_images without options', async () => {
    await service.allMetricImages(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images',
      undefined,
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
        url: 'url',
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
      undefined,
    );
  });
});

describe('Agents.uploadMetricImage', () => {
  it('should request POST /projects/1/alert_management_alerts/2/metric_images', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    const image = { content, filename: 'image.jpeg' };

    await service.uploadMetricImage(1, 2, image, { urlText: 'text' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/alert_management_alerts/2/metric_images',
      {
        isForm: true,
        file: [image.content, image.filename],
        urlText: 'text',
      },
    );
  });
});
