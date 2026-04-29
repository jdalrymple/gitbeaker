import { beforeAll, describe, expect, it } from 'vitest';

import { PackageRegistry, Projects } from '../../../../src';

const {
  GITLAB_PERSONAL_ACCESS_TOKEN = '',
  GITLAB_URL = '',
  TEST_ID = Date.now().toString(),
} = process.env;
const CREDENTIALS = {
  host: GITLAB_URL,
  token: GITLAB_PERSONAL_ACCESS_TOKEN,
};

let packageAPI: InstanceType<typeof PackageRegistry<false>>;
let projectAPI: InstanceType<typeof Projects<false>>;
let testProjectId: number;

beforeAll(async () => {
  packageAPI = new PackageRegistry(CREDENTIALS);
  projectAPI = new Projects(CREDENTIALS);

  const project = await projectAPI.create({
    name: `PackageRegistry E2E Test - NodeJS ${TEST_ID}`,
  });
  testProjectId = project.id;
}, 60000);

describe('PackageRegistry.publish and download', () => {
  it('should publish a binary file and retrieve it with matching content', async () => {
    const originalData = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const packageName = 'binary-package';
    const packageVersion = '1.0.0';
    const filename = 'test-binary.dat';

    const blob = new Blob([originalData], {
      type: 'application/octet-stream',
    });

    await packageAPI.publish(testProjectId, packageName, packageVersion, {
      content: blob,
      filename,
    });

    const downloadedFile = await packageAPI.download(
      testProjectId,
      packageName,
      packageVersion,
      filename,
    );

    expect(downloadedFile).toBeInstanceOf(Blob);

    const arrayBuffer = await downloadedFile.arrayBuffer();
    const downloadedData = new Uint8Array(arrayBuffer);

    expect(downloadedData).toEqual(originalData);
  });
});
