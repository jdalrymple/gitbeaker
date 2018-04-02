function init(...services) {
  const combined = Object.assign({}, ...services);

  return class Bundle {
    constructor(options) {
      Object.entries(combined).forEach(([name, Service]) => {
        this[name] = new Service(options);
      });
    }
  };
}

export default init;
