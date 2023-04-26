import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { Camelize, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ApplicationPlanLimitSchema extends Record<string, unknown> {
  ci_pipeline_size: number;
  ci_active_jobs: number;
  ci_active_pipelines: number;
  ci_project_subscriptions: number;
  ci_pipeline_schedules: number;
  ci_needs_size_limit: number;
  ci_registered_group_runners: number;
  ci_registered_project_runners: number;
  conan_max_file_size: number;
  generic_packages_max_file_size: number;
  helm_max_file_size: number;
  maven_max_file_size: number;
  npm_max_file_size: number;
  nuget_max_file_size: number;
  pypi_max_file_size: number;
  terraform_module_max_file_size: number;
  storage_size_limit: number;
}

export type ApplicationPlanLimitOptions = Partial<Camelize<ApplicationPlanLimitSchema>>;

export class ApplicationPlanLimits<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: { planName?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationPlanLimitSchema, C, E, void>> {
    return RequestHelper.get<ApplicationPlanLimitSchema>()(
      this,
      'application/plan_limits',
      options,
    );
  }

  edit<E extends boolean = false>(
    planName: string,
    options: ApplicationPlanLimitOptions & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<ApplicationPlanLimitSchema, C, E, void>> {
    const {
      ciPipelineSize,
      ciActiveJobs,
      ciActivePipelines,
      ciProjectSubscriptions,
      ciPipelineSchedules,
      ciNeedsSizeLimit,
      ciRegisteredGroupRunners,
      ciRegisteredProjectRunners,
      conanMaxFileSize,
      genericPackagesMaxFileSize,
      helmMaxFileSize,
      mavenMaxFileSize,
      npmMaxFileSize,
      nugetMaxFileSize,
      pypiMaxFileSize,
      terraformModuleMaxFileSize,
      storageSizeLimit,
      ...opts
    } = options;

    return RequestHelper.put<ApplicationPlanLimitSchema>()(this, 'application/plan_limits', {
      searchParams: {
        planName,
        ciPipelineSize,
        ciActiveJobs,
        ciActivePipelines,
        ciProjectSubscriptions,
        ciPipelineSchedules,
        ciNeedsSizeLimit,
        ciRegisteredGroupRunners,
        ciRegisteredProjectRunners,
        conanMaxFileSize,
        genericPackagesMaxFileSize,
        helmMaxFileSize,
        mavenMaxFileSize,
        npmMaxFileSize,
        nugetMaxFileSize,
        pypiMaxFileSize,
        terraformModuleMaxFileSize,
        storageSizeLimit,
      },
      opts,
    });
  }
}
