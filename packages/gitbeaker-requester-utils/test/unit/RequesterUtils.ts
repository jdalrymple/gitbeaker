/* eslint-disable max-classes-per-file */
import * as FormData from 'form-data';
import { createInstance, defaultRequest, modifyServices } from '../../src/RequesterUtils';

const methods = ['get', 'put', 'delete', 'stream', 'post'];

describe('defaultRequest', () => {
  const service = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should not use default request options if not passed', async () => {
    const options = defaultRequest(service);

    expect(options.method).toBe('get');
  });

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = defaultRequest(service, {
      method: 'post',
      body: testBody,
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', async () => {
    const testBody = new FormData();
    const { body } = defaultRequest(service, { body: testBody, method: 'post' });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the sudo property if omitted', async () => {
    const { headers } = defaultRequest(service, {
      sudo: undefined,
      method: 'get',
    });

    expect(headers.sudo).toBeUndefined();
  });

  it('should assign the sudo property if passed', async () => {
    const { headers } = defaultRequest(service, {
      sudo: 'testsudo',
    });

    expect(headers.sudo).toBe('testsudo');
  });

  it('should default searchParams to an empty string if undefined', async () => {
    const { searchParams } = defaultRequest(service, {
      query: undefined,
    });

    expect(searchParams).toBe('');
  });

  it('should format searchParams to an stringified object', async () => {
    const { searchParams } = defaultRequest(service, {
      query: { a: 5 },
    });

    expect(searchParams).toBe('a=5');
  });

  it('should format searchParams to an stringified object and decamelize properties', async () => {
    const { searchParams } = defaultRequest(service, {
      query: { thisSearchTerm: 5 },
    });

    expect(searchParams).toBe('this_search_term=5');
  });
});

describe('createInstance', () => {
  const handler = jest.fn();
  const optionsHandler = jest.fn(() => ({}));

  it('should have a createInstance function', async () => {
    expect(createInstance).toBeFunction();
  });

  it('should return an object with function names equal to those in the methods array when the createInstance function is called', async () => {
    const requester = createInstance(optionsHandler, handler);

    expect(requester).toContainAllKeys(methods);

    methods.forEach((m) => {
      expect(requester[m]).toBeFunction();
    });
  });

  it('should call the handler with the correct endpoint when passed to any of the method functions', async () => {
    const requester = createInstance(optionsHandler, handler);
    const service = {
      headers: { test: '5' },
      url: 'testurl',
      rejectUnauthorized: false,
      requestTimeout: 50,
    };
    const testEndpoint = 'test endpoint';

    methods.forEach((m) => {
      requester[m](service, testEndpoint, {});

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
