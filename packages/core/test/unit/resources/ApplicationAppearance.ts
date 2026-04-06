import { RequestHelper } from '../../../src/infrastructure';
import { ApplicationAppearance } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ApplicationAppearance;

beforeEach(() => {
  service = new ApplicationAppearance({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ApplicationAppearance.show', () => {
  it('should request GET /application/appearence', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/appearance', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ApplicationAppearance.edit', () => {
  it('should request PUT /application/appearence without arguments', async () => {
    await service.edit();

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /application/appearence with a logo property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ logo: { content, filename: 'test.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('logo', content, 'test.jpeg');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /application/appearence with a pwaIcon property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ pwaIcon: { content, filename: 'test.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('pwaIcon', content, 'test.jpeg');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
