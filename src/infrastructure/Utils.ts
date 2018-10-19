export function bundler(services = {}) {
  const combined = { ...services };

  return class Bundle {
    constructor(options = {}) {
      Object.keys(combined).forEach((serviceName) => {
        this[serviceName] = new combined[serviceName](options);
      });
    }
  };
}
