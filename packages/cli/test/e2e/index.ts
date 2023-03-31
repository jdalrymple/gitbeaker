import pkg from '../../package.json';

describe('General', () => {
  it('should return the expose a gitbeaker commnad', () => {
    expect(pkg.bin).toHaveProperty('gitbeaker');
  });

  it('should return the expose a gb commnad', () => {
    expect(pkg.bin).toHaveProperty('gb');
  });
});
