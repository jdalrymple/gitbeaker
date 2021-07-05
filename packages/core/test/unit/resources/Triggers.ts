import { Triggers } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Triggers;

beforeEach(() => {
  service = new Triggers({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Triggers service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(Triggers);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Triggers.all', () => {
  it('should request GET /projects/:id/triggers', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers', undefined);
  });
});

describe('Triggers.add', () => {
  it('should request POST /projects/:id/triggers', async () => {
    await service.add(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/triggers', undefined);
  });
});

describe('Triggers.edit', () => {
  it('should request PUT /projects/:id/triggers/:id', async () => {
    await service.edit(1, 2, { prop: 5 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', {
      prop: 5,
    });
  });
});

describe('Triggers.pipeline', () => {
  it('should request PUT /projects/:id/trigger/pipeline with variables', async () => {
    await service.pipeline(1, 'main', 'abcd', { variables: { VAR_ONE: 'val' } });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/trigger/pipeline', {
      isForm: true,
      ref: 'main',
      token: 'abcd',
      'variables[VAR_ONE]': 'val',
    });
  });

  it('should request PUT /projects/:id/trigger/pipeline without variables', async () => {
    await service.pipeline(1, 'main', 'abcd');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/trigger/pipeline', {
      isForm: true,
      ref: 'main',
      token: 'abcd',
    });
  });
});

describe('Triggers.show', () => {
  it('should request GET /projects/:id/triggers/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', undefined);
  });
});

describe('Triggers.remove', () => {
  it('should request DELETE /projects/:id/triggers/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/triggers/2', undefined);
  });
});
