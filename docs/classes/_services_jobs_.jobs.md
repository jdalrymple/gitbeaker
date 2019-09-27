# Class: Jobs

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **Jobs**

## Constructors

###  constructor

\+ **new Jobs**(`__namedParameters`: object): *[Jobs](_services_jobs_.jobs.md)*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`camelize` | boolean | false |
`host` | string | "https://gitlab.com" |
`jobToken` | undefined &#124; string | - |
`oauthToken` | undefined &#124; string | - |
`rejectUnauthorized` | boolean | true |
`requestTimeout` | number | 300000 |
`requester` | [Requester](../interfaces/_infrastructure_index_.requester.md) |  KyRequester |
`sudo` | undefined &#124; string &#124; number | - |
`token` | undefined &#124; string | - |
`url` | string | "" |
`version` | string | "v4" |

**Returns:** *[Jobs](_services_jobs_.jobs.md)*

## Properties

###  camelize

• **camelize**: *boolean*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[camelize](_infrastructure_baseservice_.baseservice.md#camelize)*

*Defined in [infrastructure/BaseService.ts:9](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L9)*

___

###  headers

• **headers**: *object*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[headers](_infrastructure_baseservice_.baseservice.md#headers)*

*Defined in [infrastructure/BaseService.ts:8](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L8)*

#### Type declaration:

* \[ **header**: *string*\]: string

___

###  rejectUnauthorized

• **rejectUnauthorized**: *boolean*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[rejectUnauthorized](_infrastructure_baseservice_.baseservice.md#rejectunauthorized)*

*Defined in [infrastructure/BaseService.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L10)*

___

###  requestTimeout

• **requestTimeout**: *number*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[requestTimeout](_infrastructure_baseservice_.baseservice.md#requesttimeout)*

*Defined in [infrastructure/BaseService.ts:7](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L7)*

___

###  requester

• **requester**: *[Requester](../interfaces/_infrastructure_index_.requester.md)*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[requester](_infrastructure_baseservice_.baseservice.md#requester)*

*Defined in [infrastructure/BaseService.ts:6](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L6)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  all

▸ **all**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [services/Jobs.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  cancel

▸ **cancel**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:17](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  downloadLatestArtifactFile

▸ **downloadLatestArtifactFile**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `ref`: string, `name`: string, `__namedParameters`: object): *any*

*Defined in [services/Jobs.ts:46](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L46)*

**Parameters:**

▪ **projectId**: *[ProjectId](../modules/_services_index_.md#projectid)*

▪ **ref**: *string*

▪ **name**: *string*

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`options` | [options](undefined) | - |
`stream` | boolean | false |

**Returns:** *any*

___

###  downloadSingleArtifactFile

▸ **downloadSingleArtifactFile**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `artifactPath`: string, `__namedParameters`: object): *any*

*Defined in [services/Jobs.ts:23](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L23)*

**Parameters:**

▪ **projectId**: *[ProjectId](../modules/_services_index_.md#projectid)*

▪ **jobId**: *[JobId](../modules/_services_index_.md#jobid)*

▪ **artifactPath**: *string*

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`options` | [options](undefined) | - |
`stream` | boolean | false |

**Returns:** *any*

___

###  downloadTraceFile

▸ **downloadTraceFile**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Jobs.ts:69](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  erase

▸ **erase**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:75](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  eraseArtifacts

▸ **eraseArtifacts**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:81](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  keepArtifacts

▸ **keepArtifacts**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:87](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  play

▸ **play**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:93](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  retry

▸ **retry**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [services/Jobs.ts:99](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `jobId`: [JobId](../modules/_services_index_.md#jobid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Jobs.ts:105](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`jobId` | [JobId](../modules/_services_index_.md#jobid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  showPipelineJobs

▸ **showPipelineJobs**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `pipelineId`: [PipelineId](../modules/_services_index_.md#pipelineid), `options`: object & [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [services/Jobs.ts:111](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/Jobs.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`pipelineId` | [PipelineId](../modules/_services_index_.md#pipelineid) |
`options` | object & [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
