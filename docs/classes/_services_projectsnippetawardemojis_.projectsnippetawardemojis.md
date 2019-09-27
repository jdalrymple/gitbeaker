# Class: ProjectSnippetAwardEmojis

## Hierarchy

  ↳ [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md)

  ↳ **ProjectSnippetAwardEmojis**

## Constructors

###  constructor

\+ **new ProjectSnippetAwardEmojis**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ProjectSnippetAwardEmojis](_services_projectsnippetawardemojis_.projectsnippetawardemojis.md)*

*Overrides [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[constructor](_templates_resourceawardemojis_.resourceawardsemojis.md#constructor)*

*Defined in [services/ProjectSnippetAwardEmojis.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/ProjectSnippetAwardEmojis.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ProjectSnippetAwardEmojis](_services_projectsnippetawardemojis_.projectsnippetawardemojis.md)*

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

### `Protected` resourceType

• **resourceType**: *string*

*Inherited from [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[resourceType](_templates_resourceawardemojis_.resourceawardsemojis.md#protected-resourcetype)*

*Defined in [templates/ResourceAwardEmojis.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAwardEmojis.ts#L24)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  all

▸ **all**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[all](_templates_resourceawardemojis_.resourceawardsemojis.md#all)*

*Defined in [templates/ResourceAwardEmojis.ts:32](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAwardEmojis.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  award

▸ **award**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `name`: string, `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[award](_templates_resourceawardemojis_.resourceawardsemojis.md#award)*

*Defined in [templates/ResourceAwardEmojis.ts:45](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAwardEmojis.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`name` | string |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `awardId`: [AwardId](../modules/_services_index_.md#awardid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[remove](_templates_resourceawardemojis_.resourceawardsemojis.md#remove)*

*Defined in [templates/ResourceAwardEmojis.ts:58](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAwardEmojis.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`awardId` | [AwardId](../modules/_services_index_.md#awardid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`projectId`: [ProjectId](../modules/_services_index_.md#projectid), `resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `awardId`: [AwardId](../modules/_services_index_.md#awardid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceAwardsEmojis](_templates_resourceawardemojis_.resourceawardsemojis.md).[show](_templates_resourceawardemojis_.resourceawardsemojis.md#show)*

*Defined in [templates/ResourceAwardEmojis.ts:72](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceAwardEmojis.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`projectId` | [ProjectId](../modules/_services_index_.md#projectid) |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`awardId` | [AwardId](../modules/_services_index_.md#awardid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
