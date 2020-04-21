import * as path from 'path';

describe('Browser Import', () => {
  it('should import the Gitbeaker library though the global gitbeaker', async () => {
    await page.goto(`file://${path.resolve(__dirname, 'assets', 'test-import.html')}`);

    // Run import JS
    /* eslint-disable */
    const importObject = await page.evaluate(() => {
      // @ts-ignore
      const { Gitlab } = gitbeaker.default;

      return Gitlab;
    });
    /* eslint-enable */

    expect(importObject).toEqual({});
  });
});
