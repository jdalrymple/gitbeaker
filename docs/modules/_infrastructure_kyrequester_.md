# External module: "infrastructure/KyRequester"

## Variables

### `Const` KyRequester

• **KyRequester**: *[Requester](../interfaces/_infrastructure_index_.requester.md)* =  {} as Requester

*Defined in [infrastructure/KyRequester.ts:8](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/KyRequester.ts#L8)*

___

### `Const` methods

• **methods**: *string[]* =  ['get', 'post', 'put', 'delete', 'stream']

*Defined in [infrastructure/KyRequester.ts:7](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/KyRequester.ts#L7)*

## Functions

###  defaultRequest

▸ **defaultRequest**(`service`: any, `__namedParameters`: object): *object*

*Defined in [infrastructure/KyRequester.ts:21](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/KyRequester.ts#L21)*

**Parameters:**

▪ **service**: *any*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | any |
`method` | any |
`query` | any |
`sudo` | any |

**Returns:** *object*

* **headers**: *Headers*

* **json**: *any* =  typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : body

* **method**: *any* =  (method === 'stream') ? 'get' : method

* **onProgress**: *undefined | (Anonymous function)* =  (method === 'stream') ? () => {} : undefined

* **prefixUrl**: *any* =  service.url

* **rejectUnauthorized**: *any* =  service.rejectUnauthorized

* **searchParams**: *string* =  stringify(decamelizeKeys(query || {}) as any, { arrayFormat: 'bracket' })

* **timeout**: *any* =  service.requestTimeout

___

###  processBody

▸ **processBody**(`response`: any): *Promise‹any›*

*Defined in [infrastructure/KyRequester.ts:38](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/KyRequester.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |

**Returns:** *Promise‹any›*

___

###  responseHeadersAsObject

▸ **responseHeadersAsObject**(`response`: any): *object*

*Defined in [infrastructure/KyRequester.ts:10](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/infrastructure/KyRequester.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |

**Returns:** *object*
