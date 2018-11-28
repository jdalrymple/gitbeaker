import { BaseService, RequestHelper } from '../infrastructure';
import {
	BaseRequestOptions,
	PaginatedRequestOptions,
	PipelineScheduleId,
	ProjectId,
	KeyId,
} from '@typings';

class PipelineScheduleVariables extends BaseService {
	all(
		projectId: ProjectId,
		pipelineScheduleId: PipelineScheduleId,
		options?: PaginatedRequestOptions,
	) {
		const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

		return RequestHelper.get(
			this,
			`projects/${pId}/pipeline_schedules/${psId}/variables`,
			options,
		);
	}

	create(
		projectId: ProjectId,
		pipelineScheduleId: PipelineScheduleId,
		options?: BaseRequestOptions,
	) {
		const [pId, psId] = [projectId, pipelineScheduleId].map(encodeURIComponent);

		return RequestHelper.post(
			this,
			`projects/${pId}/pipeline_schedules/${psId}/variables`,
			options,
		);
	}

	edit(
		projectId: ProjectId,
		pipelineScheduleId: PipelineScheduleId,
		keyId: KeyId,
		options?: BaseRequestOptions,
	) {
		const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

		return RequestHelper.put(
			this,
			`projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
			options,
		);
	}

	show(
		projectId: ProjectId,
		pipelineScheduleId: PipelineScheduleId,
		keyId: KeyId,
		options?: BaseRequestOptions,
	) {
		const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

		return RequestHelper.get(
			this,
			`projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
			options,
		);
	}

	remove(
		projectId: ProjectId,
		pipelineScheduleId: PipelineScheduleId,
		keyId: KeyId,
		options?: BaseRequestOptions,
	) {
		const [pId, psId, kId] = [projectId, pipelineScheduleId, keyId].map(encodeURIComponent);

		return RequestHelper.del(
			this,
			`projects/${pId}/pipeline_schedules/${psId}/variables/${kId}`,
			options,
		);
	}
}

export default PipelineScheduleVariables;
