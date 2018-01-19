function parse(value) {
  if (Number.isInteger(value)) return value;

  return encodeURIComponent(value);
}

export {
  parse,
};
