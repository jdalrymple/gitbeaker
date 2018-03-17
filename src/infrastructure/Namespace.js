function init(options, ...services) {
  const combined = Object.assign({}, ...services);

  return Object.entries(combined).reduce((output, [name, Service]) => {
    output[name] = new Service(options); return output;
  }, {});
}

export {
  init,
};
