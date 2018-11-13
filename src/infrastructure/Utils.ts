import { BaseService } from '.';

export function bundler(services = {}) {
  return class Bundle {
    [serviceName: string]: BaseService;
    
    constructor(options?: any) {
      Object.entries(services).forEach(([name, ser]: [string, any]) => {
        this[name] = new ser(options);
      });
    }
  };
}