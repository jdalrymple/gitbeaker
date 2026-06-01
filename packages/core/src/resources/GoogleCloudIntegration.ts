import { BaseResource } from '@gitbeaker/requester-utils';

import type { ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface WorkloadIdentityFederationOptions {
  google_cloud_project_id: string;
  google_cloud_workload_identity_pool_id?: string;
  google_cloud_workload_identity_pool_display_name?: string;
  google_cloud_workload_identity_pool_provider_id?: string;
  google_cloud_workload_identity_pool_provider_display_name?: string;
}

export interface GoogleCloudIntegrationOptions {
  enable_google_cloud_artifact_registry: boolean;
  google_cloud_artifact_registry_project_id: string;
}

export interface RunnerDeploymentProjectOptions {
  google_cloud_project_id: string;
}

export class GoogleCloudIntegration<C extends boolean = false> extends BaseResource<C> {
  workloadIdentityFederationScript<E extends boolean = false>(
    projectId: string | number,
    options: ShowExpanded<E> & Sudo & WorkloadIdentityFederationOptions,
  ) {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/google_cloud/setup/wlif.sh`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  integrationScript<E extends boolean = false>(
    projectId: string | number,
    options: GoogleCloudIntegrationOptions & ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`${projectId}/google_cloud/setup/integrations.sh`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  runnerDeploymentProjectScript<E extends boolean = false>(
    projectId: string | number,
    options: RunnerDeploymentProjectOptions & ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`${projectId}/google_cloud/setup/runner_deployment_project.sh`,
      {
        searchParams,
        showExpanded,
        sudo,
      },
    );
  }
}
