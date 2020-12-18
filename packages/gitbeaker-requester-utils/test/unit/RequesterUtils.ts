/* eslint-disable max-classes-per-file */
import FormData from 'form-data';
import { createRequesterFn, defaultOptionsHandler, modifyServices } from '../../src/RequesterUtils';

const methods = ['get', 'put', 'delete', 'stream', 'post'];

describe('defaultOptionsHandler', () => {
  const serviceOptions = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should not use default request options if not passed', async () => {
    const options = defaultOptionsHandler(serviceOptions);

    expect(options.method).toBe('get');
  });

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = defaultOptionsHandler(serviceOptions, {
      method: 'post',
      body: testBody,
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', async () => {
    const testBody = new FormData();
    const { body } = defaultOptionsHandler(serviceOptions, { body: testBody, method: 'post' });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the sudo property if omitted', async () => {
    const { headers } = defaultOptionsHandler(serviceOptions, {
      sudo: undefined,
      method: 'get',
    });

    expect(headers.sudo).toBeUndefined();
  });

  it('should assign the sudo property if passed', async () => {
    const { headers } = defaultOptionsHandler(serviceOptions, {
      sudo: 'testsudo',
    });

    expect(headers.sudo).toBe('testsudo');
  });

  it('should default searchParams to an empty string if undefined', async () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: undefined,
    });

    expect(searchParams).toBe('');
  });

  it('should format searchParams to an stringified object', async () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: { a: 5 },
    });

    expect(searchParams).toBe('a=5');
  });

  it('should format searchParams to an stringified object and decamelize properties', async () => {
    const { searchParams } = defaultOptionsHandler(serviceOptions, {
      query: { thisSearchTerm: 5 },
    });

    expect(searchParams).toBe('this_search_term=5');
  });
});

describe('createInstance', () => {
  const handler = jest.fn();
  const optionsHandler = jest.fn(() => ({}));
  const serviceOptions = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should have a createInstance function', async () => {
    expect(createRequesterFn).toBeFunction();
  });

  it('should return an object with function names equal to those in the methods array when the createInstance function is called', async () => {
    const requester = createRequesterFn(optionsHandler, handler)(serviceOptions);

    expect(requester).toContainAllKeys(methods);

    methods.forEach((m) => {
      expect(requester[m]).toBeFunction();
    });
  });

  it('should call the handler with the correct endpoint when passed to any of the method functions', async () => {
    const testEndpoint = 'test endpoint';
    const requester = createRequesterFn(optionsHandler, handler)(serviceOptions);

    methods.forEach((m) => {
      requester[m](testEndpoint, {});

      expect(handler).toBeCalledWith(testEndpoint, {});
    });
  });
});

describe('modifyServices', () => {
  it('should preset class with extended properties', async () => {
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

  it('should preset class with default properties', async () => {
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

  it('should overwrite default properties with extended properties', async () => {
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

  it('should overwrite default properties with custom properties', async () => {
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

  it('should overwrite default and extended properties with custom properties', async () => {
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
