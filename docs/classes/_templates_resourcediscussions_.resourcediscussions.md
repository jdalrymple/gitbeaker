# Class: ResourceDiscussions

## Hierarchy

* [BaseService](_infrastructure_baseservice_.baseservice.md)

  ↳ **ResourceDiscussions**

  ↳ [EpicDiscussions](_services_epicdiscussions_.epicdiscussions.md)

  ↳ [CommitDiscussions](_services_commitdiscussions_.commitdiscussions.md)

  ↳ [IssueDiscussions](_services_issuediscussions_.issuediscussions.md)

  ↳ [MergeRequestDiscussions](_services_mergerequestdiscussions_.mergerequestdiscussions.md)

  ↳ [ProjectSnippetDiscussions](_services_projectsnippetdiscussions_.projectsnippetdiscussions.md)

## Constructors

###  constructor

\+ **new ResourceDiscussions**(`resourceType`: string, `resource2Type`: string, `options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md)*

*Overrides [BaseService](_infrastructure_baseservice_.baseservice.md).[constructor](_infrastructure_baseservice_.baseservice.md#constructor)*

*Defined in [templates/ResourceDiscussions.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceType` | string |
`resource2Type` | string |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[ResourceDiscussions](_templates_resourcediscussions_.resourcediscussions.md)*

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

### `Protected` resource2Type

• **resource2Type**: *string*

*Defined in [templates/ResourceDiscussions.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L12)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  addNote

▸ **addNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `content`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceDiscussions.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`content` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  all

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceDiscussions.ts:45](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `content`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceDiscussions.ts:51](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`content` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  editNote

▸ **editNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Defined in [templates/ResourceDiscussions.ts:67](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  removeNote

▸ **removeNote**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Defined in [templates/ResourceDiscussions.ts:85](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `discussionId`: [DiscussionId](../modules/_services_index_.md#discussionid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Defined in [templates/ResourceDiscussions.ts:103](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceDiscussions.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`discussionId` | [DiscussionId](../modules/_services_index_.md#discussionid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
