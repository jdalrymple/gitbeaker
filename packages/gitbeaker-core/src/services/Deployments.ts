import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { DeploymentSchema, DeploymentStatus, MergeRequestSchema } from '../models';

export class Deployments<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<DeploymentSchema[]>()(this, `projects/${pId}/deployments`, options);
  }

  create(
    projectId: string | number,
    environment: string,
    sha: string,
    ref: string,
    tag: string,
    status: DeploymentStatus,
    options?: Sudo,
  ) {
    const [pId] = [projectId].map(encodeURIComponent);

    return RequestHelper.post<DeploymentSchema>()(this, `projects/${pId}/deployments`, {
      environment,
      sha,
      ref,
      tag,
      status,
      ...options,
    });
  }

  edit(projectId: string | number, deploymentId: number, status: DeploymentStatus, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.put<DeploymentSchema>()(this, `projects/${pId}/deployments/${dId}`, {
      status,
      ...options,
    });
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<DeploymentSchema>()(
      this,
      `projects/${pId}/deployments/${dId}`,
      options,
    );
  }

  mergeRequests(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      `projects/${pId}/deployments/${dId}/merge_requests`,
      options,
    );
  }
}
