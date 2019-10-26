interface Constructor {
  new (...args: any): any;
}

type Mapper<T extends { [name: string]: Constructor }, P extends keyof T> = {
  [name in P]: InstanceType<T[name]>;
};

export interface Bundle<T extends { [name: string]: Constructor }, P extends keyof T> {
  new (options?: any): Mapper<T, P>;
}

export function bundler<T extends { [name: string]: Constructor }, P extends keyof T>(services: T) {
  return (function Bundle(options?: any) {
    Object.entries(services || {}).forEach(([name, ser]) => {
      this[name] = new ser(options);
    });
  } as any) as Bundle<T, P>;
}
