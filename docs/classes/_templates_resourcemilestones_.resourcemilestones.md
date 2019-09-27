# Class: ResourceMilestones

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceMilestones**

  ↳ [GroupMilestones](_services_groupmilestones_.groupmilestones.md)

  ↳ [ProjectMilestones](_services_projectmilestones_.projectmilestones.md)

## Constructors

###  constructor

\+ **new ResourceMilestones**(`resourceType`: string, `options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ResourceMilestones](_templates_resourcemilestones_.resourcemilestones.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceMilestones.ts:11](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ResourceMilestones](_templates_resourcemilestones_.resourcemilestones.md)*

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

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMilestones.ts:16](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `title`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceMilestones.ts:22](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`title` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `milestoneId`: [MilestoneId](../modules/_services_index_.md#milestoneid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceMilestones.ts:28](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`milestoneId` | [MilestoneId](../modules/_services_index_.md#milestoneid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  issues

▸ **issues**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `milestoneId`: [MilestoneId](../modules/_services_index_.md#milestoneid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMilestones.ts:34](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`milestoneId` | [MilestoneId](../modules/_services_index_.md#milestoneid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  mergeRequests

▸ **mergeRequests**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `milestoneId`: [MilestoneId](../modules/_services_index_.md#milestoneid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMilestones.ts:40](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`milestoneId` | [MilestoneId](../modules/_services_index_.md#milestoneid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `milestoneId`: [MilestoneId](../modules/_services_index_.md#milestoneid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceMilestones.ts:46](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceMilestones.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`milestoneId` | [MilestoneId](../modules/_services_index_.md#milestoneid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
