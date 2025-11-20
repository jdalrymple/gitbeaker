import { vi, beforeEach, describe, expect, it } from 'vitest';
import {
  BaseResource,
  DefaultRequesterOptions,
  FormattedResponse,
  RequesterType,
  ResponseBodyType,
} from '@gitbeaker/requester-utils';
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
  rawRequestOptions: DefaultRequesterOptions = {},
  maxPages = 10,
) {
  const page = (rawRequestOptions?.searchParams?.page as number) || 1;
  const perPage = (rawRequestOptions?.searchParams?.perPage as number) || 2;

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
    body: Array.from({ length: +perPage }).map((_, i) => ({
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

function mockedTimedoutRequest(
  responseFn: (ep: string, ops: DefaultRequesterOptions) => FormattedResponse<ResponseBodyType>,
  timeoutIds: NodeJS.Timeout[] = [],
) {
  return (
    endpoint: string,
    options: DefaultRequesterOptions,
  ): Promise<FormattedResponse<ResponseBodyType>> =>
    new Promise((resolve, reject) => {
      if (options?.signal?.aborted) return;

      const abortListener = () => {
        reject(new Error('Request Timeout'));
      };

      const timeoutId = setTimeout(() => {
        options?.signal?.removeEventListener('abort', abortListener);
        const response = responseFn(endpoint, options);
        resolve(response);
      }, 100);

      timeoutIds.push(timeoutId);

      options?.signal?.addEventListener('abort', abortListener);
    });
}

const mockedRequester = {
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
} as RequesterType;

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
      signal: expect.any(AbortSignal),
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
      searchParams: { pagination: 'offset' },
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
      searchParams: { pagination: 'offset' },
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
      searchParams: { page: 2 },
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
        searchParams: { page: 2 },
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
      searchParams: { page: 2 },
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
      searchParams: { pagination: 'keyset' },
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
      maxPages: 2,
      searchParams: { pagination: 'keyset', orderBy: 'id', sort: 'asc' },
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
      searchParams: { pagination: 'keyset' },
      showExpanded: true,
    });

    expect(response.data).toHaveLength(20);

    response.data.forEach((l, index: number) => {
      const value = 1 + index;

      expect(l.prop1).toBe(value);
      expect(l.prop2).toBe(`test property ${value.toString()}`);
    });
  });

  it('should extract keyset pagination info when showExpanded is given with all keyset parameters', async () => {
    mockedRequester.get.mockImplementation((endpoint, options) =>
      Promise.resolve(mockedGetMany(`${service.url}${endpoint}`, options)),
    );

    const response = await RequestHelper.get<Record<string, unknown>[]>()(service, 'test', {
      searchParams: {
        pagination: 'keyset',
        orderBy: 'id',
        sort: 'asc',
        idAfter: '100',
        cursor: 'abc123',
        perPage: '10',
      },
      maxPages: 1,
      showExpanded: true,
    });

    expect(response.data).toHaveLength(10); // perPage is set to 10 in searchParams
    expect(response.paginationInfo).toMatchObject({
      orderBy: 'id',
      sort: 'asc',
      idAfter: 100,
      cursor: 'abc123',
      perPage: 10,
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
          { id: 3, gravatar_enable: true },
          { id: 4, gravatar_enable: false },
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

    expect(results).toMatchObject({ id: 3, gravatar_enable: true });
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

  it('should timeout if a single query takes too long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 50,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: '', status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.get.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.get()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(60);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });

  it('should timeout if multiple queries cumulatively take long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 150,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      (ep, op) => mockedGetMany(`${timedService.url}${ep}`, op, 4),
      timeoutIds,
    );

    mockedRequester.get.mockImplementation(mockImplementation);

    const promise = RequestHelper.get()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(200);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });

  it('should not timeout if a single query takes less time than the specified timeout to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 200,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: { message: 'pass' }, status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.get.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.get()(timedService, 'test');

    // Fast-forward time but not enough to trigger timeout
    jest.advanceTimersByTime(100);

    const response = await promise;

    expect(response).toMatchObject({
      message: 'pass',
    });

    jest.useRealTimers();
  });
});

describe('RequestHelper.post()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.post.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.post()(service, 'test', { sudo: 'yes' });

    expect(service.requester.post).toHaveBeenCalledWith('test', {
      sudo: 'yes',
      signal: expect.any(AbortSignal),
    });
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

  it('should pass body and searchParams when provided', async () => {
    mockedRequester.post.mockReturnValueOnce(
      Promise.resolve({ body: { success: true }, status: 201, headers: {} }),
    );

    await RequestHelper.post()(service, 'test', {
      body: { name: 'test' },
      searchParams: { include: 'details' },
      sudo: 'admin',
    });

    expect(service.requester.post).toHaveBeenCalledWith('test', {
      body: { name: 'test' },
      searchParams: { include: 'details' },
      sudo: 'admin',
      signal: expect.any(AbortSignal),
    });
  });

  it('should timeout if a single query takes too long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 50,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: '', status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.post.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.post()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(60);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.put.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.put()(service, 'test', { sudo: 'yes' });

    expect(service.requester.put).toHaveBeenCalledWith('test', {
      sudo: 'yes',
      signal: expect.any(AbortSignal),
    });
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

  it('should pass body and searchParams when provided', async () => {
    mockedRequester.put.mockReturnValueOnce(
      Promise.resolve({ body: { updated: true }, status: 200, headers: {} }),
    );

    await RequestHelper.put()(service, 'test', {
      body: { name: 'updated' },
      searchParams: { include: 'metadata' },
      sudo: 'admin',
    });

    expect(service.requester.put).toHaveBeenCalledWith('test', {
      body: { name: 'updated' },
      searchParams: { include: 'metadata' },
      sudo: 'admin',
      signal: expect.any(AbortSignal),
    });
  });

  it('should timeout if a single query takes too long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 50,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: '', status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.put.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.put()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(60);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });
});

describe('RequestHelper.patch()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.patch.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.patch()(service, 'test', { sudo: 'yes' });

    expect(service.requester.patch).toHaveBeenCalledWith('test', {
      sudo: 'yes',
      signal: expect.any(AbortSignal),
    });
  });

  it('should respond with the a wrapped body', async () => {
    const responseTemplate = { status: 200, headers: { test: '1' }, body: '' };

    mockedRequester.patch.mockReturnValueOnce(Promise.resolve(responseTemplate));

    const response = await RequestHelper.patch()(service, 'test', { showExpanded: true });

    expect(response).toMatchObject({
      data: responseTemplate.body,
      headers: responseTemplate.headers,
      status: responseTemplate.status,
    });
  });

  it('should pass body and searchParams when provided', async () => {
    mockedRequester.patch.mockReturnValueOnce(
      Promise.resolve({ body: { patched: true }, status: 200, headers: {} }),
    );

    await RequestHelper.patch()(service, 'test', {
      body: { field: 'patched' },
      searchParams: { include: 'relations' },
      sudo: 'admin',
    });

    expect(service.requester.patch).toHaveBeenCalledWith('test', {
      body: { field: 'patched' },
      searchParams: { include: 'relations' },
      sudo: 'admin',
      signal: expect.any(AbortSignal),
    });
  });

  it('should camelize response body when service has camelize enabled', async () => {
    const camelizedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      camelize: true,
    });

    mockedRequester.patch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        body: { snake_case_field: 'value', another_field: true },
        headers: {},
      }),
    );

    const response = await RequestHelper.patch()(camelizedService, 'test');

    expect(response).toMatchObject({
      snakeCaseField: 'value',
      anotherField: true,
    });
  });

  it('should timeout if a single query takes too long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 50,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: '', status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.patch.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.patch()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(60);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    mockedRequester.delete.mockReturnValueOnce(
      Promise.resolve({ body: '', status: 200, headers: {} }),
    );

    await RequestHelper.del()(service, 'test', { sudo: 'yes' });

    expect(service.requester.delete).toHaveBeenCalledWith('test', {
      sudo: 'yes',
      signal: expect.any(AbortSignal),
    });
  });

  it('should timeout if a single query takes too long to execute', async () => {
    jest.useFakeTimers();

    const timedService = new BaseResource({
      requesterFn: () => mockedRequester,
      host: 'https://testing.com',
      token: 'token',
      queryTimeout: 50,
    });

    const timeoutIds = [];
    const mockImplementation = mockedTimedoutRequest(
      () => ({ body: '', status: 200, headers: {} }),
      timeoutIds,
    );

    mockedRequester.delete.mockImplementationOnce(mockImplementation);

    const promise = RequestHelper.del()(timedService, 'test');

    // Fast-forward time to trigger timeout
    jest.advanceTimersByTime(60);

    await expect(promise).rejects.toThrow('Request Timeout');

    jest.useRealTimers();
  });
});
