import { BaseService } from '.';
import { BaseModelContructorOptions } from './BaseService';

function Bundler<T extends { [K: string]: typeof BaseService }>(
  services: T,
): new (...args: any[]) => { [K in keyof T]: InstanceType<T[K]> } {
  const combined = { ...services as object } as T;
  interface BundleClass {
    [K: string]: BaseService;
  }
  return class Bundle implements BundleClass {
    [K: string]: any;
    constructor(options: BaseModelContructorOptions = {}) {
      Object.keys(combined).forEach((serviceName) => {
        this[serviceName] = new combined[serviceName](options);
      });
    }
  } as temporaryAny;
}

export default Bundler;
