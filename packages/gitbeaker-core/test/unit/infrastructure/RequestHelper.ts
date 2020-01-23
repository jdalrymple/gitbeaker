import { Requester } from '@gitbeaker/requester-base';
import { RequestHelper, BaseService } from '../../../src/infrastructure';

/* eslint no-empty-pattern: 0 */
/* eslint prefer-destructuring: 0 */

const mockedGetBasic = () => ({
  body: {
    prop1: 5,
    prop2: 'test property',
  },
  headers: {
    'X-Page': 1,
    'X-Total-Pages': 1,
  },
});

const mockedGetExtended = (url, { query }, limit = 30) => {
  const pages: object[] = [];
  const q = url.match(/page=([0-9]+)/);
  let page = 1;

  if (q != null) page = q[1];
  else if (query.page) page = query.page;

  // Only load pages needed for the test
  // TODO: modify this to only generate the required response, without the loop
  for (let i = 1, a = 1, b = 2; i <= limit && i <= page; i += 1, a += 2, b += 2) {
    let next = '';
    let prev = '';
    let nextPage;
    let prevPage;

    if (i + 1 <= limit) {
      next = `<https://www.test.com/api/v4/test?page=${i + 1}&per_page=2>; rel="next",`;
      nextPage = i + 1;
    }

    if (i - 1 >= 1) {
      prev = `<https://www.test.com/api/v4/test?page=${i - 1}&per_page=2>; rel="prev",`;
      prevPage = i - 1;
    }

    pages.push({
      body: [
        {
          prop1: a,
          prop2: `test property ${a}`,
        },
        {
          prop1: b,
          prop2: `test property ${b}`,
        },
      ],
      headers: {
        link: `${next}${prev}<https://www.test.com/api/v4/test?page=1&per_page=2>; rel="first",<https://www.test.com/api/v4/test?page=${limit}&per_page=2>; rel="last"`,
        'x-next-page': nextPage,
        'x-page': i,
        'x-per-page': 2,
        'x-prev-page': prevPage,
        'x-total': limit * 2,
        'x-total-pages': limit,
      },
    });
  }

  return pages[page - 1];
};

const service = new BaseService({
  host: 'https://testing.com',
  token: 'token',
});

describe('RequestHelper.get()', () => {
  it('should respond with the proper get url without pagination', async () => {
    Requester.get = jest.fn(() => mockedGetBasic());

    await RequestHelper.get(service, 'test');

    expect(Requester.get).toHaveBeenCalledWith(service, 'test', {
      query: {},
      sudo: undefined,
    });
  });

  it('should respond with an object', async () => {
    Requester.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('should be paginated when links are present', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(60);
  });

  it('should handle large paginated (50 pages) results when links are present', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options, 70));

    const response = await RequestHelper.get(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(140);
  });

  it('should be paginated but limited by the maxPages option', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { maxPages: 3 });

    expect(response).toHaveLength(6);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('should be paginated but limited by the page option', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2 });

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('should show the pagination information when the page option is given', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2, showExpanded: true });

    expect(response.data).toHaveLength(2);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });

    expect(response.pagination).toMatchObject({
      total: 60,
      previous: 1,
      current: 2,
      next: 3,
      perPage: 2,
      totalPages: 30,
    });
  });

  it('should show the pagination information when the maxPages option is given', async () => {
    Requester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', {
      maxPages: 3,
      showExpanded: true,
    });

    expect(response.data).toHaveLength(6);

    response.data.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response.pagination).toMatchObject({
      total: 60,
      previous: 2,
      current: 3,
      next: 4,
      perPage: 2,
      totalPages: 30,
    });
  });
});

describe('RequestHelper.stream()', () => {
  it('should throw an error when the stream function isnt available', async () => {
    Requester.stream = undefined;

    expect(() => RequestHelper.stream(service, 'test')).toThrow(
      'Stream method is not implementated in requester!',
    );
  });

  it('should not throw an error when the stream function is available', async () => {
    Requester.stream = jest.fn();

    RequestHelper.stream(service, 'test');

    expect(Requester.stream).toBeCalled();
  });
});

describe('RequestHelper.post()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    Requester.post = jest.fn(() => ({ body: '' }));

    await RequestHelper.post(service, 'test', { sudo: 'yes' });

    expect(Requester.post).toBeCalledWith(service, 'test', { body: {}, sudo: 'yes' });
  });

  it('should by default pass the form, before the body if passed', async () => {
    Requester.post = jest.fn(() => ({ body: '' }));

    RequestHelper.post(service, 'test', { form: 1, test: 3 });

    expect(Requester.post).toBeCalledWith(service, 'test', { body: 1, sudo: undefined });
  });
});

describe('RequestHelper.put()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    Requester.put = jest.fn(() => ({ body: '' }));

    await RequestHelper.put(service, 'test', { sudo: 'yes' });

    expect(Requester.put).toBeCalledWith(service, 'test', { body: {}, sudo: 'yes' });
  });
});

describe('RequestHelper.del()', () => {
  it('should pass the correct arguments to the Requester', async () => {
    Requester.delete = jest.fn(() => ({ body: '' }));

    await RequestHelper.del(service, 'test', { sudo: 'yes' });

    expect(Requester.delete).toBeCalledWith(service, 'test', { query: {}, sudo: 'yes' });
  });
});
