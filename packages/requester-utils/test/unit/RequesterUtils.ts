import { RateLimiterMemory } from 'rate-limiter-flexible';
import {
  RequestOptions,
  ResourceOptions,
  createRateLimiters,
  createRequesterFn,
  defaultOptionsHandler,
  formatQuery,
  getMatchingRateLimiter,
  presetResourceArguments,
} from '../../src/RequesterUtils';

jest.mock('rate-limiter-flexible');

const methods = ['get', 'put', 'patch', 'delete', 'post'];

describe('defaultOptionsHandler', () => {
  const serviceOptions: ResourceOptions = {
    headers: { test: '5' },
    authHeaders: {
      token: () => Promise.resolve('1234'),
    },
    url: 'testurl',
    rejectUnauthorized: false,
    rateLimits: {},
  };

  it('should not use default request options if not passed', async () => {
    const options = await defaultOptionsHandler(serviceOptions);

    expect(options.method).toBe('GET');
  });

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = await defaultOptionsHandler(serviceOptions, {
      method: 'POST',
      body: testBody,
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', async () => {
    const testBody = new FormData();

    testBody.set('test', 'one');

    const { body } = await defaultOptionsHandler(serviceOptions, {
      body: testBody,
      method: 'POST',
    });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the sudo property if omitted', async () => {
    const { headers } = await defaultOptionsHandler(serviceOptions, {
      sudo: undefined,
      method: 'GET',
    });

    expect(headers?.sudo).toBeUndefined();
  });

  it('should assign the sudo property if passed', async () => {
    const { headers } = await defaultOptionsHandler(serviceOptions, {
      sudo: 'testsudo',
    });

    expect(headers?.sudo).toBe('testsudo');
  });

  it('should assign the prefixUrl property if passed', async () => {
    const { prefixUrl } = await defaultOptionsHandler(serviceOptions);

    expect(prefixUrl).toBe('testurl');
  });

  it('should not default searchParams', async () => {
    const { searchParams } = await defaultOptionsHandler(serviceOptions, {
      searchParams: undefined,
    });

    expect(searchParams).toBeUndefined();
  });

  it('should format searchParams to an stringified object', async () => {
    const { searchParams } = await defaultOptionsHandler(serviceOptions, {
      searchParams: { a: 5 },
    });

    expect(searchParams).toBe('a=5');
  });

  it('should format searchParams to an stringified object and decamelize properties', async () => {
    const { searchParams } = await defaultOptionsHandler(serviceOptions, {
      searchParams: { thisSearchTerm: 5 },
    });

    expect(searchParams).toBe('this_search_term=5');
  });

  it('should append dynamic authentication token headers', async () => {
    const { headers } = await defaultOptionsHandler(serviceOptions, {
      sudo: undefined,
      method: 'GET',
    });

    expect(headers?.token).toBe('1234');
  });
});

describe('createInstance', () => {
  const requestHandler = jest.fn();
  const optionsHandler = jest.fn(() => Promise.resolve({} as RequestOptions));
  const serviceOptions: ResourceOptions = {
    headers: { test: '5' },
    authHeaders: {
      token: () => Promise.resolve('1234'),
    },
    url: 'testurl',
    rejectUnauthorized: false,
  };

  it('should have a createInstance function', () => {
    expect(createRequesterFn).toBeFunction();
  });

  it('should return an object with function names equal to those in the methods array when the createInstance function is called', () => {
    const requester = createRequesterFn(optionsHandler, requestHandler)(serviceOptions);

    expect(requester).toContainAllKeys(methods);

    methods.forEach((m) => {
      expect(requester[m]).toBeFunction();
    });
  });

  it('should call the requestHandler with the correct endpoint when passed to any of the method functions', async () => {
    const testEndpoint = 'test endpoint';
    const requester = createRequesterFn(optionsHandler, requestHandler)(serviceOptions);

    // eslint-disable-next-line
    for (const m of methods) {
      // eslint-disable-next-line
      await requester[m](testEndpoint, {});

      expect(optionsHandler).toHaveBeenCalledWith(
        serviceOptions,
        expect.objectContaining({ method: m.toUpperCase() }),
      );
      expect(requestHandler).toHaveBeenCalledWith(testEndpoint, { rateLimiters: {} });
    }
  });

  it('should respect the closure variables', async () => {
    const serviceOptions1: ResourceOptions = {
      headers: { test: '5' },
      authHeaders: {
        token: () => Promise.resolve('1234'),
      },
      url: 'testurl',
      rejectUnauthorized: false,
      rateLimits: {},
    };
    const serviceOptions2: ResourceOptions = {
      headers: { test: '5' },
      authHeaders: {
        token: () => Promise.resolve('1234'),
      },
      url: 'testurl2',
      rejectUnauthorized: true,
      rateLimits: {},
    };

    const requesterFn = createRequesterFn(optionsHandler, requestHandler);
    const requesterA = requesterFn(serviceOptions1);
    const requesterB = requesterFn(serviceOptions2);

    await requesterA.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(
      serviceOptions1,
      expect.objectContaining({ method: 'GET' }),
    );

    await requesterB.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(
      serviceOptions2,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should pass the rate limiters to the requestHandler function', async () => {
    const testEndpoint = 'test endpoint';
    const requester = createRequesterFn(
      optionsHandler,
      requestHandler,
    )({
      ...serviceOptions,
      rateLimits: {
        '*': 40,
        'projects/*/test': {
          method: 'GET',
          limit: 10,
        },
      },
    });

    await requester.get(testEndpoint, {});

    expect(requestHandler).toHaveBeenCalledWith(testEndpoint, {
      rateLimiters: {
        '*': expect.toBeFunction(),
        'projects/*/test': {
          method: 'GET',
          limit: expect.toBeFunction(),
        },
      },
    });
  });
});

describe('createRateLimiters', () => {
  it('should create rate limiter functions when configured', () => {
    const limiters = createRateLimiters({
      '*': 40,
      'projects/*/test': {
        method: 'GET',
        limit: 10,
      },
    });

    expect(RateLimiterMemory).toHaveBeenCalledWith({ points: 10, duration: 60 });
    expect(RateLimiterMemory).toHaveBeenCalledWith({ points: 40, duration: 60 });

    expect(limiters).toStrictEqual({
      '*': expect.toBeFunction(),
      'projects/*/test': {
        method: 'GET',
        limit: expect.toBeFunction(),
      },
    });
  });
});

describe('presetResourceArguments', () => {
  class A {
    x: number;

    y?: number;

    constructor({ x = 8, y }: { x?: number; y?: number } = {}) {
      this.x = x;
      this.y = y;
    }
  }

  it('should preset class with extended properties', () => {
    const { A: B } = presetResourceArguments({ A }, { x: 3 });
    const b = new B();

    expect(b.x).toBe(3);
  });

  it('should preset class with default properties', () => {
    const { A: B } = presetResourceArguments({ A });
    const b = new B();

    expect(b.x).toBe(8);
  });

  it('should overwrite default properties with extended properties', () => {
    const { A: B } = presetResourceArguments({ A }, { x: 3 });
    const b = new B();

    expect(b.x).toBe(3);
  });

  it('should overwrite default properties with custom properties', () => {
    const { A: B } = presetResourceArguments({ A });
    const b = new B({ x: 5 });

    expect(b.x).toBe(5);
  });

  it('should overwrite default and extended properties with custom properties', () => {
    const { A: B } = presetResourceArguments({ A }, { x: 2 });
    const b = new B({ x: 5 });

    expect(b.x).toBe(5);
  });
});

describe('formatQuery', () => {
  it('should decamelize keys and stringify the object', () => {
    const string = formatQuery({ test: 6 });

    expect(string).toBe('test=6');
  });

  it('should decamelize sub keys in not property and stringify the object', () => {
    const string = formatQuery({ test: 6, not: { test: 7 } });

    expect(string).toBe('test=6&not%5Btest%5D=7');
  });
});

describe('getMatchingRateLimiter', () => {
  it('should default the method to GET if not passed', async () => {
    const rateLimiter = jest.fn();
    const matchingRateLimiter = getMatchingRateLimiter('endpoint', {
      '*': { method: 'GET', limit: rateLimiter },
    });

    await matchingRateLimiter();

    expect(rateLimiter).toHaveBeenCalledTimes(1);
  });

  it('should uppercase method for matching', async () => {
    const rateLimiter = jest.fn();
    const matchingRateLimiter = getMatchingRateLimiter('endpoint', {
      '*': { method: 'get', limit: rateLimiter },
    });

    await matchingRateLimiter();

    expect(rateLimiter).toHaveBeenCalledTimes(1);
  });

  it('should default the rateLimiters to an empty object if not passed and return the default rate of 3000 rpm', () => {
    getMatchingRateLimiter('endpoint');

    expect(RateLimiterMemory).toHaveBeenCalledWith({ points: 3000, duration: 60 });
  });

  it('should return the most specific rate limit', async () => {
    const rateLimiter = jest.fn();
    const matchingRateLimiter = getMatchingRateLimiter('endpoint/testing', {
      '*': jest.fn(),
      'endpoint/testing*': rateLimiter,
    });

    await matchingRateLimiter();

    expect(rateLimiter).toHaveBeenCalledTimes(1);
  });

  it('should return a default rate limit of 3000 rpm if nothing matches', () => {
    getMatchingRateLimiter('endpoint', { someurl: jest.fn() });

    expect(RateLimiterMemory).toHaveBeenCalledWith({ points: 3000, duration: 60 });
  });

  it('should handle expanded rate limit options with a particular method and limit', async () => {
    const rateLimiter = jest.fn();
    const matchingRateLimiter = getMatchingRateLimiter('endpoint', {
      '*': { method: 'get', limit: rateLimiter },
    });

    await matchingRateLimiter();

    expect(rateLimiter).toHaveBeenCalledTimes(1);
  });

  it('should handle simple rate limit options with a particular limit', async () => {
    const rateLimiter = jest.fn();
    const matchingRateLimiter = getMatchingRateLimiter('endpoint/testing', { '**': rateLimiter });

    await matchingRateLimiter();

    expect(rateLimiter).toHaveBeenCalledTimes(1);
  });
});
