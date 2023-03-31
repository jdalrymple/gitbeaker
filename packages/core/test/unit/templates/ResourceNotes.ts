import { ResourceNotes } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ResourceNotes;

beforeEach(() => {
  service = new ResourceNotes('resource1', 'resource2', {
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceNotes service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceNotes);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource1');
  });
});

describe('ResourceNotes.all', () => {
  it('should call the correct url', async () => {
    await service.all(4, 5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '4/resource2/5/notes', undefined);
  });
});

describe('ResourceNotes.create', () => {
  it('should call the correct url creating a note', async () => {
    await service.create(4, 5, 'test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '4/resource2/5/notes', {
      body: 'test',
    });
  });
});

describe('ResourceNotes.edit', () => {
  it('should call correct url for editing a note', async () => {
    await service.edit(4, 5, 6, { body: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '4/resource2/5/notes/6', {
      body: 'test',
    });
  });
});

describe('ResourceNotes.show', () => {
  it('should call correct url for showing a note', async () => {
    await service.show(4, 5, 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '4/resource2/5/notes/6', undefined);
  });
});

describe('ResourceNotes.remove', () => {
  it('should call correct url for removing a note', async () => {
    await service.remove(4, 5, 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '4/resource2/5/notes/6', undefined);
  });
});
