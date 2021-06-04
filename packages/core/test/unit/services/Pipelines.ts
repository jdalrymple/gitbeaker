import { Pipelines } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Pipelines;

beforeEach(() => {
  service = new Pipelines({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Pipelines service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(Pipelines);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Projects.create', () => {
  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create(1, 'ci/cd', {
      variables: {
        PULL_REQUEST_NAME: 'TEST',
      },
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/pipeline', {
      ref: 'ci/cd',
      variables: {
        PULL_REQUEST_NAME: 'TEST',
      },
    });
  });
});
