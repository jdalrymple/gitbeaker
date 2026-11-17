import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GoogleCloudIntegration } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GoogleCloudIntegration;

beforeEach(() => {
  service = new GoogleCloudIntegration({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GoogleCloudIntegration.workloadIdentityFederationScript', () => {
  it('should request GET /projects/:id/google_cloud/setup/wlif.sh', async () => {
    await service.workloadIdentityFederationScript(1, {
      googleCloudProjectId: 'gcp',
      sudo: 'u',
    } as any);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/google_cloud/setup/wlif.sh',
      { searchParams: { googleCloudProjectId: 'gcp' }, showExpanded: undefined, sudo: 'u' },
    );
  });
});

describe('GoogleCloudIntegration.integrationScript', () => {
  it('should request GET /projects/:id/google_cloud/setup/integrations.sh', async () => {
    await service.integrationScript(1, { googleCloudProjectId: 'gcp' } as any);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/google_cloud/setup/integrations.sh',
      { searchParams: { googleCloudProjectId: 'gcp' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('GoogleCloudIntegration.runnerDeploymentProjectScript', () => {
  it('should request GET /projects/:id/google_cloud/setup/runner_deployment_project.sh', async () => {
    await service.runnerDeploymentProjectScript(1, { googleCloudProjectId: 'gcp' } as any);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/google_cloud/setup/runner_deployment_project.sh',
      { searchParams: { googleCloudProjectId: 'gcp' }, showExpanded: undefined, sudo: undefined },
    );
  });
});
