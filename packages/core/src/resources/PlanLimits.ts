import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface PlanLimitSchema extends Record<string, unknown> {
  ci_instance_level_variables: number;
  ci_pipeline_size: number;
  ci_active_jobs: number;
  ci_project_subscriptions: number;
  ci_pipeline_schedules: number;
  ci_needs_size_limit: number;
  ci_registered_group_runners: number;
  ci_registered_project_runners: number;
  dotenv_size: number;
  dotenv_variables: number;
  conan_max_file_size: number;
  enforcement_limit: number;
  generic_packages_max_file_size: number;
  helm_max_file_size: number;
  notification_limit: number;
  maven_max_file_size: number;
  npm_max_file_size: number;
  nuget_max_file_size: number;
  pipeline_hierarchy_size: number;
  pypi_max_file_size: number;
  terraform_module_max_file_size: number;
  storage_size_limit: number;
  web_hook_calls?: number;
}

export interface UpdatePlanLimitOptions {
  planName: string;
  ciInstanceLevelVariables?: number;
  ciPipelineSize?: number;
  ciActiveJobs?: number;
  ciProjectSubscriptions?: number;
  ciPipelineSchedules?: number;
  ciNeedsSizeLimit?: number;
  ciRegisteredGroupRunners?: number;
  ciRegisteredProjectRunners?: number;
  dotenvSize?: number;
  dotenvVariables?: number;
  conanMaxFileSize?: number;
  enforcementLimit?: number;
  genericPackagesMaxFileSize?: number;
  helmMaxFileSize?: number;
  mavenMaxFileSize?: number;
  notificationLimit?: number;
  npmMaxFileSize?: number;
  nugetMaxFileSize?: number;
  pipelineHierarchySize?: number;
  pypiMaxFileSize?: number;
  terraformModuleMaxFileSize?: number;
  storageSizeLimit?: number;
  webHookCalls?: number;
}

export class PlanLimits<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: { planName?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PlanLimitSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<PlanLimitSchema>()(this, 'application/plan_limits', {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  edit<E extends boolean = false>(
    options: ShowExpanded<E> & Sudo & UpdatePlanLimitOptions,
  ): Promise<GitlabAPIResponse<PlanLimitSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;

    return RequestHelper.put<PlanLimitSchema>()(this, 'application/plan_limits', {
      sudo,
      showExpanded,
      body,
    });
  }
}
