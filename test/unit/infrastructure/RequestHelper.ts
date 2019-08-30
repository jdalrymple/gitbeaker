import { RequestHelper, KyRequester, BaseService } from '../../../src/core/infrastructure';

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
  it('Should respond with the proper get url without pagination', async () => {
    KyRequester.get = jest.fn(() => mockedGetBasic());

    await RequestHelper.get(service, 'test');

    expect(KyRequester.get).toHaveBeenCalledWith(service, 'test', {
      query: {},
      sudo: undefined,
    });
  });

  it('Should respond with an object', async () => {
    KyRequester.get = jest.fn(() => mockedGetBasic());

    const response = await RequestHelper.get(service, 'test');

    expect(response.prop1).toBe(5);
    expect(response.prop2).toBe('test property');
  });

  it('Should be paginated when links are present', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(60);
  });

  it('Should handle large paginated (50 pages) results when links are present', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options, 70));

    const response = await RequestHelper.get(service, 'test');

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });

    expect(response).toHaveLength(140);
  });

  it('Should be paginated but limited by the maxPages option', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { maxPages: 3 });

    expect(response).toHaveLength(6);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(1 + index);
      expect(l.prop2).toBe(`test property ${1 + index}`);
    });
  });

  it('Should be paginated but limited by the page option', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2 });

    expect(response).toHaveLength(2);

    response.forEach((l, index) => {
      expect(l.prop1).toBe(3 + index);
      expect(l.prop2).toBe(`test property ${3 + index}`);
    });
  });

  it('Should show the pagination information when the page option is given', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', { page: 2, showPagination: true });

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

  it('Should show the pagination information when the maxPages option is given', async () => {
    KyRequester.get = jest.fn(({}, url, options) => mockedGetExtended(url, options));

    const response = await RequestHelper.get(service, 'test', {
      maxPages: 3,
      showPagination: true,
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
