import { BaseResource, RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure/RequestHelper';

/* eslint no-empty-pattern: 0 */
/* eslint prefer-destructuring: 0 */
function mockLink(url: string, page: number, perPage: number, maxPages: number) {
  const type = {
    prev: page - 1 > 0 ? page - 1 : undefined,
    current: page,
    next: page + 1 <= maxPages ? page + 1 : undefined,
    first: 1,
    last: maxPages,
  };

  const links = Object.entries(type).reduce((acc, [k, v]) => {
    if (v) acc.push(`<${url}?page=${v}&per_page=${perPage}>; rel="${k}"`);
    return acc;
  }, [] as string[]);

  return { link: links.join(','), pagination: type };
}

function mockedGetMany(
  url: string,
  rawRequestOptions: { searchParams?: Record<string, number> } = {},
  maxPages = 10,
) {
  const page = rawRequestOptions?.searchParams?.page || 1;
  const perPage = rawRequestOptions?.searchParams?.perPage || 2;

  // Only load pages needed for the test
  const { link, pagination } = mockLink(url, +page, +perPage, +maxPages);

  const headers = {
    link,
    'x-page': page.toString(),
    'x-per-page': perPage.toString(),
    'x-total': (maxPages * perPage).toString(),
    'x-total-pages': maxPages.toString(),
  };

  if (pagination.next) headers['x-next-page'] = pagination.next.toString();
  if (pagination.prev) headers['x-prev-page'] = pagination.prev.toString();

  return {
    status: 200,
    body: new Array(+perPage).fill(null).map((_, i) => ({
      prop1: (+page - 1) * +perPage + i + 1, // Index from 1, not 0
      prop2: `test property ${(page - 1) * perPage + i + 1}`,
    })),
    headers,
  };
}

function mockedGetOne() {
  return {
    status: 200,
    body: {
      prop1: 5,
      prop2: 'test property',
    },
    headers: {
      'x-page': (1).toString(),
      'x-total-pages': (1).toString(),
    },
  };
}

const mockedRequester: jest.Mocked<RequesterType> = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
};

let service: BaseResource;

beforeEach(() => {
  service = new BaseResource({
    requesterFn: () => mockedRequester,
    host: 'https://testing.com',
    token: 'token',
  });
});

describe('RequestHelper.get()', () => {
  it('should respond with the proper get url without pagination', async () => {
    mockedRequester.get.mockReturnValueOnce(Promise.resolve(mockedGetOne()));

    await RequestHelper.get()(service, 'test');

    expect(service.requester.get).toHaveBeenCalledWith('test', {
      searchParams: {},
      sudo: undefined,
    });
  });

  it('should respond with the a wrapped body', async () => {
    mockedRequester.get.mockReturnValueOnce(Promise.resolve(mockedGetOne()));

    const response = await RequestHelper.get()(service, 'test', { showExpanded: true });

    expect(response).toMatchObject({
      data: {
        prop1: 5,
        prop2: 'test property',
      },
      headers: {
        'x-page': '1',
      },
      status: 200,
    });
  });

  it('should respond with an object', async () => {
    mockedRequester.get.mockReturnValueOnce(Promise.resolve(mockedGetOne()));

    const response = await RequestHelper.get<Record<string, unknown>>()(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('should be paginated when links are present', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test');

    response.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });

    expect(response).toHaveLength(20);
  });

  it('should handle large paginated (50 pages) results when links are present', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 51)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      maxPages: 50,
    });

    response.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });

    expect(response).toHaveLength(100);
  });

  it('should be paginated but limited by the maxPages option', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 5)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      maxPages: 3,
    });

    expect(response).toHaveLength(6);

    response.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should be paginated but limited by the page option', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      page: 2,
    });

    expect(response).toHaveLength(2);

    response.forEach((l, index: number) => {
      const value = 3 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should show the pagination information when the showExpanded option is given', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()<false, true, 'offset'>(
      service,
      'test',
      {
        page: 2,
        showExpanded: true,
      },
    );

    expect(response.data).toHaveLength(2);

    response.data.forEach((l, index: number) => {
      const value = 3 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });

    expect(response.paginationInfo).toMatchObject({
      total: 20,
      previous: 1,
      current: 2,
      next: 3,
      perPage: 2,
      totalPages: 10,
    });
  });

  it('should not show the pagination information when the showExpanded option is undefined or false', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      page: 2,
      showExpanded: false,
    });

    expect(response).toHaveLength(2);

    response.forEach((l, index: number) => {
      const value = 3 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should not show the pagination information when using keyset pagination', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
    });

    expect(response).toHaveLength(20);

    response.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should support maxPages when using keyset pagination', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options, 3)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
      maxPages: 2,
    });

    expect(response).toHaveLength(4);

    response.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should show the pagination information when using keyset pagination and showExpanded is given', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      pagination: 'keyset',
      showExpanded: true,
    });

    expect(response.data).toHaveLength(20);

    response.data.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should return simple response with camelized keys when using the camelize option', async () => {
    class ExtendedResource<C extends boolean> extends BaseResource<C> {
      show() {
        return RequestHelper.get()(this, 'dummyendpoint');
      }
    }

    const s = new ExtendedResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      camelize: true,
    });

    mockedRequester.get.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        body: [
          { id: 3, gravatar_enable: true }, // eslint-disable-line
          { id: 4, gravatar_enable: false }, // eslint-disable-line
        ],
        headers: {},
      }),
    );

    const results = await s.show();

    expect(results).toIncludeSameMembers([
      { id: 3, gravatarEnable: true },
      { id: 4, gravatarEnable: false },
    ]);
  });

  it('should return simple response with default keys without camelize option', async () => {
    class SpecialService<C extends boolean> extends BaseResource<C> {
      show() {
        return RequestHelper.get()(this, 'test');
      }
    }

    const specialService = new SpecialService({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
    });

    mockedRequester.get.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        body: { id: 3, gravatar_enable: true },
        headers: {},
      }),
    );

    const results = await specialService.show();

    expect(results).toMatchObject({ id: 3, gravatar_enable: true }); // eslint-disable-line
  });

  it('should return a stream if asStream is passed', async () => {
    const readableStream = new ReadableStream();

    mockedRequester.get.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        body: readableStream,
        headers: {},
      }),
    );

    const response = await RequestHelper.get()(service, 'test', { asStream: true });

    expect(response).toBe(readableStream);
  });

  it('should return a wrapped stream if showExpanded and asStream flags are passed', async () => {
    const readableStream = new ReadableStream();

    mockedRequester.get.mockReturnValueOnce(
      Promise.resolve({
        body: readableStream,
        status: 200,
        headers: { test: 'string' },
      }),
    );

    const response = await RequestHelper.get()(service, 'test', {
      showExpanded: true,
      asStream: true,
    });

    expect(response).toMatchObject({
      data: readableStream,
      headers: { test: 'string' },
      status: 200,
    });
  });
});

describe('RequestHelper.post()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.post.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.post()(service, 'test', { sudo: 'yes' });

    expect(service.requester.post).toHaveBeenCalledWith('test', { body: {}, sudo: 'yes' });
  });

  it('should respond with the a wrapped body', async () => {
    const responseTemplate = { status: 200, headers: { test: '1' }, body: '' };

    mockedRequester.post.mockReturnValueOnce(Promise.resolve(responseTemplate));

    const response = await RequestHelper.post()(service, 'test', { showExpanded: true });

    expect(response).toMatchObject({
      data: responseTemplate.body,
      headers: responseTemplate.headers,
      status: responseTemplate.status,
    });
  });

  it('should pass arguments as form arguments if the isForm flag is passed', async () => {
    mockedRequester.post.mockReturnValueOnce(
      Promise.resolve({
        body: '',
        status: 200,
        headers: {},
      }),
    );

    await RequestHelper.post()(service, 'test', { isForm: true, test: 3 });

    expect(service.requester.post).toHaveBeenCalledWith('test', {
      body: expect.any(FormData),
      sudo: undefined,
      searchParams: undefined,
    });
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.put.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.put()(service, 'test', { sudo: 'yes' });

    expect(service.requester.put).toHaveBeenCalledWith('test', { body: {}, sudo: 'yes' });
  });

  it('should respond with the a wrapped body', async () => {
    const responseTemplate = { status: 200, headers: { test: '1' }, body: '' };

    mockedRequester.put.mockReturnValueOnce(Promise.resolve(responseTemplate));

    const response = await RequestHelper.put()(service, 'test', { showExpanded: true });

    expect(response).toMatchObject({
      data: responseTemplate.body,
      headers: responseTemplate.headers,
      status: responseTemplate.status,
    });
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.delete.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.del()(service, 'test', { sudo: 'yes' });

    expect(service.requester.delete).toHaveBeenCalledWith('test', { body: {}, sudo: 'yes' });
  });
});
