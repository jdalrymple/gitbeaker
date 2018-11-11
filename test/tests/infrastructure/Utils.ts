import { bundler }  from '../../../src/infrastructure';

class Test1 {
  constructor(value: number) {
    this.value = value * 3;
  }
}

class Test2 {
  constructor(value: number) {
    this.value = value * 2;
  }
}

test('No classes passed to Bundler returns an empty Bundle', async () => {
  const Bundle = bundler();
  const services = new Bundle();
  
  expect(services).toEqual({});
});

test('Classes passed to Bundler get merged', async () => {
  const Bundle = bundler({ Test1, Test2 });
  const services = new Bundle();

  expect(services.Test1).toBeInstanceOf(Test1);
  expect(services.Test2).toBeInstanceOf(Test2);
});

test('Classes passed to Bundler with options get initialized', async () => {
  const Bundle = bundler({ Test1, Test2 });
  const services = new Bundle(2);

  expect(services.Test1.value).toBe(6);
  expect(services.Test2.value).toBe(4);
});
