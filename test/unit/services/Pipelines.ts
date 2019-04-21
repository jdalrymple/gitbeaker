import { Pipelines } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');
jest.mock('got', () => ({
  // This wont work for all cases, but for the tests currently outlined below, it should be fine
  get: jest.fn(() => {
    body: [];
  }),
  post: jest.fn(() => {
    body: {
    }
  }),
  put: jest.fn(() => {
    body: {
    }
  }),
}));

let service: Pipelines;

beforeEach(() => {
  service = new Pipelines({
    token: 'abcdefg',
  });
});

describe('Instantiating Pipelines service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Pipelines);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
  });
});

describe('Projects.create', () => {
  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create(1, 'ci/cd', {
      variables: {
        PULL_REQUEST_NAME: 'TEST',
      },
    });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/pipeline', {
      ref: 'ci/cd',
      variables: {
        PULL_REQUEST_NAME: 'TEST',
      },
    });
  });
});
