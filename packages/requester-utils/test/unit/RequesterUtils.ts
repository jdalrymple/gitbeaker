import {
  RequestOptions,
  createRequesterFn,
  defaultOptionsHandler,
  formatQuery,
  presetResourceArguments,
} from '../../src/RequesterUtils';

const methods = ['get', 'put', 'patch', 'delete', 'post'];

describe('defaultOptionsHandler', () => {
  const serviceOptions = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
  };

  it('should not use default request options if not passed', async () => {
    const options = await defaultOptionsHandler(serviceOptions);

    expect(options.method).toBe('get');
  });

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = await defaultOptionsHandler(serviceOptions, {
      method: 'post',
      body: testBody,
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', async () => {
    const testBody: globalThis.FormData = new FormData() as unknown as globalThis.FormData;
    const { body } = await defaultOptionsHandler(serviceOptions, {
      body: testBody,
      method: 'post',
    });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the sudo property if omitted', async () => {
    const { headers } = (await defaultOptionsHandler(serviceOptions, {
      sudo: undefined,
      method: 'get',
    })) as { headers: Record<string, string> };

    expect(headers.sudo).toBeUndefined();
  });

  it('should assign the sudo property if passed', async () => {
    const { headers } = (await defaultOptionsHandler(serviceOptions, {
      sudo: 'testsudo',
    })) as { headers: Record<string, string> };

    expect(headers.sudo).toBe('testsudo');
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
});

describe('createInstance', () => {
  const requestHandler = jest.fn();
  const optionsHandler = jest.fn(() => Promise.resolve({} as RequestOptions));
  const serviceOptions = {
    headers: { test: '5' },
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

      expect(optionsHandler).toHaveBeenCalledWith(serviceOptions, { method: m });
      expect(requestHandler).toHaveBeenCalledWith(testEndpoint, {});
    }
  });

  it('should respect the closure variables', async () => {
    const serviceOptions1 = {
      headers: { test: '5' },
      url: 'testurl',
      rejectUnauthorized: false,
    };
    const serviceOptions2 = {
      headers: { test: '5' },
      url: 'testurl2',
      rejectUnauthorized: true,
    };

    const requesterFn = createRequesterFn(optionsHandler, requestHandler);
    const requesterA = requesterFn(serviceOptions1);
    const requesterB = requesterFn(serviceOptions2);

    await requesterA.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(serviceOptions1, { method: 'get' });

    await requesterB.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(serviceOptions2, { method: 'get' });
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
