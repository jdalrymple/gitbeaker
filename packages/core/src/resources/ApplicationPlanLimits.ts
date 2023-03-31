import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { Camelize, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ApplicationPlanLimitSchema extends Record<string, unknown> {
  conan_max_file_size: number;
  generic_packages_max_file_size: number;
  helm_max_file_size: number;
  maven_max_file_size: number;
  npm_max_file_size: number;
  nuget_max_file_size: number;
  pypi_max_file_size: number;
  terraform_module_max_file_size: number;
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
      conanMaxFileSize,
      genericPackagesMaxFileSize,
      helmMaxFileSize,
      mavenMaxFileSize,
      npmMaxFileSize,
      nugetMaxFileSize,
      pypiMaxFileSize,
      terraformModuleMaxFileSize,
      ...opts
    } = options;

    return RequestHelper.put<ApplicationPlanLimitSchema>()(this, 'application/plan_limits', {
      searchParams: {
        planName,
        conanMaxFileSize,
        genericPackagesMaxFileSize,
        helmMaxFileSize,
        mavenMaxFileSize,
        npmMaxFileSize,
        nugetMaxFileSize,
        pypiMaxFileSize,
        terraformModuleMaxFileSize,
      },
      opts,
    });
  }
}
