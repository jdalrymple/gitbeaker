import { BaseService } from '.';
import { BaseModelContructorOptions } from './BaseService';

function Bundler<T extends { [K: string]: typeof BaseService }>(
  services: T,
): new (baseOptions: BaseModelContructorOptions) => { [K in keyof T]: InstanceType<T[K]> } {
  const combined = { ...services as object } as T;
  interface BundleClass {
    [K: string]: BaseService;
  }
  return class Bundle implements BundleClass {
    [K: string]: any;
    constructor(baseOptions: BaseModelContructorOptions) {
      Object.keys(combined).forEach((serviceName) => {
        this[serviceName] = new combined[serviceName](baseOptions);
      });
    }
  } as temporaryAny;
}

export default Bundler;
