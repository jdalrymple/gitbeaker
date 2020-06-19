import { default as FormData } from 'formdata-node'; // eslint-disable-line
import { bundler, appendFormFromObject } from '../../../src/infrastructure';

describe('bundler', () => {
  /* eslint max-classes-per-file: 0 */
  class Test1 {
    public value: number;

    constructor(value: number) {
      this.value = value * 3;
    }
  }

  class Test2 {
    public value: number;

    constructor(value: number) {
      this.value = value * 2;
    }
  }

  it('should merge classes passed to Bundler', async () => {
    const Bundle = bundler({ Test1, Test2 });
    const services = new Bundle();

    expect(services.Test1).toBeInstanceOf(Test1);
    expect(services.Test2).toBeInstanceOf(Test2);
  });

  it('should initialize classes passed to Bundler with options', async () => {
    const Bundle = bundler({ Test1, Test2 });
    const services = new Bundle(2);

    expect(services.Test1.value).toBe(6);
    expect(services.Test2.value).toBe(4);
  });
});

describe('appendFormFromObject', () => {
  it('should convert object key/values to formdata instance', async () => {
    const data = { a: 5, b: 'test' };
    const form = appendFormFromObject(data);
    const results = Array.from(form.entries());

    expect(form).toBeInstanceOf(FormData);
    expect(results[0]).toStrictEqual(['a', '5']);
    expect(results[1]).toStrictEqual(['b', 'test']);
  });

  it('should convert object key/values with metadata to formdata instance', async () => {
    const data = { a: 5, b: ['test', { filename: 'name.jpg' }] };
    const form = appendFormFromObject(data);
    const results = Array.from(form.entries());

    expect(form).toBeInstanceOf(FormData);
    expect(results[0]).toStrictEqual(['a', '5']);
    expect(results[1]).toStrictEqual(['b', 'test']);
  });
});
