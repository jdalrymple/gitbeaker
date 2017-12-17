function parse(value) {
  if (typeof value === 'number') return value;
  else if (value.toString().includes('/')) return encodeURIComponent(value);

  return parseInt(value, 10);
}

export {
  parse,
};
