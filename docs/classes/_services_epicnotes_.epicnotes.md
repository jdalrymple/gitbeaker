# Class: EpicNotes

## Hierarchy

  ↳ [ResourceNotes](_templates_resourcenotes_.resourcenotes.md)

  ↳ **EpicNotes**

## Constructors

###  constructor

\+ **new EpicNotes**(`options`: [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md)): *[EpicNotes](_services_epicnotes_.epicnotes.md)*

*Overrides [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[constructor](_templates_resourcenotes_.resourcenotes.md#constructor)*

*Defined in [services/EpicNotes.ts:4](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/services/EpicNotes.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BaseServiceOptions](../interfaces/_infrastructure_index_.baseserviceoptions.md) |

**Returns:** *[EpicNotes](_services_epicnotes_.epicnotes.md)*

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

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[resource2Type](_templates_resourcenotes_.resourcenotes.md#protected-resource2type)*

*Defined in [templates/ResourceNotes.ts:12](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L12)*

___

###  url

• **url**: *string*

*Inherited from [BaseService](_infrastructure_baseservice_.baseservice.md).[url](_infrastructure_baseservice_.baseservice.md#url)*

*Defined in [infrastructure/BaseService.ts:5](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/BaseService.ts#L5)*

## Methods

###  all

▸ **all**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `options?`: [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[all](_templates_resourcenotes_.resourcenotes.md#all)*

*Defined in [templates/ResourceNotes.ts:24](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`options?` | [PaginatedRequestOptions](../interfaces/_infrastructure_index_.paginatedrequestoptions.md) |

**Returns:** *Promise‹object | object | object[]›*

___

###  create

▸ **create**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `body`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[create](_templates_resourcenotes_.resourcenotes.md#create)*

*Defined in [templates/ResourceNotes.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`body` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  edit

▸ **edit**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `body`: string, `options?`: [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md)): *Promise‹object›*

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[edit](_templates_resourcenotes_.resourcenotes.md#edit)*

*Defined in [templates/ResourceNotes.ts:44](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`body` | string |
`options?` | [BaseRequestOptions](../interfaces/_infrastructure_index_.baserequestoptions.md) |

**Returns:** *Promise‹object›*

___

###  remove

▸ **remove**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object›*

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[remove](_templates_resourcenotes_.resourcenotes.md#remove)*

*Defined in [templates/ResourceNotes.ts:59](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object›*

___

###  show

▸ **show**(`resourceId`: [ResourceId](../modules/_services_index_.md#resourceid), `resource2Id`: [ResourceId](../modules/_services_index_.md#resourceid), `noteId`: [NoteId](../modules/_services_index_.md#noteid), `options?`: [Sudo](../interfaces/_infrastructure_index_.sudo.md)): *Promise‹object | object | object[]›*

*Inherited from [ResourceNotes](_templates_resourcenotes_.resourcenotes.md).[show](_templates_resourcenotes_.resourcenotes.md#show)*

*Defined in [templates/ResourceNotes.ts:65](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/templates/ResourceNotes.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceId` | [ResourceId](../modules/_services_index_.md#resourceid) |
`resource2Id` | [ResourceId](../modules/_services_index_.md#resourceid) |
`noteId` | [NoteId](../modules/_services_index_.md#noteid) |
`options?` | [Sudo](../interfaces/_infrastructure_index_.sudo.md) |

**Returns:** *Promise‹object | object | object[]›*
