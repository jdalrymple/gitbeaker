import { RequestHelper } from '../../../src/infrastructure';
import { Topics } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Topics;

beforeEach(() => {
  service = new Topics({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Topics.all', () => {
  it('should request GET /topics without properties', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics', undefined);
  });

  it('should request GET /topics with properties', async () => {
    await service.all({ search: 'test' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics', { search: 'test' });
  });
});

describe('Topics.create', () => {
  it('should request POST /topics without properties', async () => {
    await service.create('topicname');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics', { name: 'topicname' });
  });

  it('should request POST /topics with form properties', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.create('topicname', { avatar: { content, filename: 'name.jpeg' } });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics', {
      isForm: true,
      file: [content, 'name.jpeg'],
      name: 'topicname',
    });
  });
});

describe('Topics.edit', () => {
  it('should request PUT /topics/:id with basic properties', async () => {
    await service.edit(3, { name: 'topicname' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics/3', { name: 'topicname' });
  });

  it('should request PUT /topics with form properties', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit(3, { avatar: { content, filename: 'name.jpeg' } });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics/3', {
      isForm: true,
      file: [content, 'name.jpeg'],
    });
  });
});

describe('Topics.merge', () => {
  it('should request POST /topics/merge', async () => {
    await service.merge(2, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'topics/merge', {
      sourceTopicId: 2,
      targetTopicId: 2,
    });
  });
});

describe('Topics.remove', () => {
  it('should request DEL /topics', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'topics/2', undefined);
  });
});

describe('Topics.show', () => {
  it('should request GET /topics', async () => {
    await service.show(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'topics/2', undefined);
  });
});
