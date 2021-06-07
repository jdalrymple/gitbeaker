/* eslint-disable max-classes-per-file */
import FormData from 'form-data';
import 'jest-extended';
import {
  createRequesterFn,
  defaultOptionsHandler,
  modifyServices,
  formatQuery,
  DefaultRequestReturn,
} from '../../src/RequesterUtils';

const methods = ['get', 'put', 'delete', 'stream', 'post'];

describe('defaultOptionsHandler', () => {
  const serviceOptions = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should not use default request options if not passed', () => {
    const options = defaultOptionsHandler(serviceOptions);

    expect(options.method).toBe('get');
  });

  it('should stringify body if it isnt of type FormData', () => {
    const testBody = { test: 6 };
    const { body, headers } = defaultOptionsHandler(serviceOptions, {
      method: 'post',
      body: testBody,
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', () => {
    const testBody = new FormData();
    const { body } = defaultOptionsHandler(serviceOptions, { body: testBody, method: 'post' });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the sudo property if omitted', () => {
    const { headers } = defaultOptionsHandler(serviceOptions, {
      sudo: undefined,
      method: 'get',
    }) as { headers: Record<string, string> };

    expect(headers.sudo).toBeUndefined();
  });

  it('should assign the sudo property if passed', () => {
    const { headers } = defaultOptionsHandler(serviceOptions, {
      sudo: 'testsudo',
    }) as { headers: Record<string, string> };

    expect(headers.sudo).toBe('testsudo');
  });

  it('should assign the prefixUrl property if passed', () => {
    const { prefixUrl } = defaultOptionsHandler(serviceOptions);

    expect(prefixUrl).toBe('testurl');
  });

  it('should default searchParams to an empty string if undefined', () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: undefined,
    });

    expect(searchParams).toBe('');
  });

  it('should format searchParams to an stringified object', () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: { a: 5 },
    });

    expect(searchParams).toBe('a=5');
  });

  it('should format searchParams to an stringified object and decamelize properties', () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: { thisSearchTerm: 5 },
    });

    expect(searchParams).toBe('this_search_term=5');
  });
});

describe('createInstance', () => {
  const handler = jest.fn();
  const optionsHandler = jest.fn(() => ({} as DefaultRequestReturn));
  const serviceOptions = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should have a createInstance function', () => {
    expect(createRequesterFn).toBeFunction();
  });

  it('should return an object with function names equal to those in the methods array when the createInstance function is called', () => {
    const requester = createRequesterFn(optionsHandler, handler)(serviceOptions);

    expect(requester).toContainAllKeys(methods);

    methods.forEach((m) => {
      expect(requester[m]).toBeFunction();
    });
  });

  it('should call the handler with the correct endpoint when passed to any of the method functions', () => {
    const testEndpoint = 'test endpoint';
    const requester = createRequesterFn(optionsHandler, handler)(serviceOptions);

    methods.forEach((m) => {
      requester[m](testEndpoint, {});

      expect(optionsHandler).toBeCalledWith(serviceOptions, { method: m });
      expect(handler).toBeCalledWith(testEndpoint, {});
    });
  });

  it('should respect the closure variables', async () => {
    const serviceOptions1 = {
      headers: { test: '5' },
      url: 'testurl',
      rejectUnauthorized: false,
      requestTimeout: 50,
    };
    const serviceOptions2 = {
      headers: { test: '5' },
      url: 'testurl2',
      rejectUnauthorized: true,
      requestTimeout: 100,
    };

    const requesterFn = createRequesterFn(optionsHandler, handler);
    const requesterA = requesterFn(serviceOptions1);
    const requesterB = requesterFn(serviceOptions2);

    await requesterA.get('test');

    expect(optionsHandler).toBeCalledWith(serviceOptions1, { method: 'get' });

    await requesterB.get('test');

    expect(optionsHandler).toBeCalledWith(serviceOptions2, { method: 'get' });
  });
});

describe('modifyServices', () => {
  it('should ignore non-function types', () => {
    const modified = modifyServices({ a: 1 }, { x: 3 });

    expect(modified).toMatchObject({});
  });

  it('should preset class with extended properties', () => {
    class A {
      x?: number;

      y?: number;

      constructor({ x, y }: { x?: number; y?: number } = {}) {
        this.x = x;
        this.y = y;
      }
    }

    const { A: B } = modifyServices({ A }, { x: 3 });
    const b = new B();

    expect(b.x).toBe(3);
  });

  it('should preset class with default properties', () => {
    class A {
      x: number;

      y?: number;

      constructor({ x = 8, y }: { x?: number; y?: number } = {}) {
        this.x = x;
        this.y = y;
      }
    }

    const { A: B } = modifyServices({ A });
    const b = new B();

    expect(b.x).toBe(8);
  });

  it('should overwrite default properties with extended properties', () => {
    class A {
      x: number;

      y?: number;

      constructor({ x = 8, y }: { x?: number; y?: number } = {}) {
        this.x = x;
        this.y = y;
      }
    }

    const { A: B } = modifyServices({ A }, { x: 3 });
    const b = new B();

    expect(b.x).toBe(3);
  });

  it('should overwrite default properties with custom properties', () => {
    class A {
      x: number;

      y?: number;

      constructor({ x = 8, y }: { x?: number; y?: number } = {}) {
        this.x = x;
        this.y = y;
      }
    }

    const { A: B } = modifyServices({ A });
    const b = new B({ x: 5 });

    expect(b.x).toBe(5);
  });

  it('should overwrite default and extended properties with custom properties', () => {
    class A {
      x: number;

      y?: number;

      constructor({ x = 8, y }: { x?: number; y?: number } = {}) {
        this.x = x;
        this.y = y;
      }
    }

    const { A: B } = modifyServices({ A }, { x: 2 });
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

    expect(string).toBe('not=%7B%22test%22%3A7%7D&test=6');
  });
});
