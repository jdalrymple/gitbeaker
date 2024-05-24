### Custom Request Libraries

There is another constructor parameter that allows the user to specify their custom request library. To specify the library, simply set the `requester` property when instantiating a service:

An example can be seen in the [Requester.ts](../packages/rest/src/Requester.ts) file.

```javascript
import { Gitlab } from '@gitbeaker/rest';
import YourCustomRequester from 'custom-requester';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
  requester: YourCustomRequester,
});
```

#### Handling HTTPS certificates

If your Gitlab server is running via HTTPS, the proper way to pass in your certificates is via a `NODE_EXTRA_CA_CERTS` environment key, like this:

```js
"scripts": {
    "start": "NODE_EXTRA_CA_CERTS=./secrets/3ShapeCA.pem node bot.js"
},
```

> **NOTE**: Setting `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` can also allow insecure certificates to be bypassed.

#### Support for Node v16.18+

Since everything builds off fetch support, applying a poly fill will allow for Node v16.18 instead of 18+. ie:

1. Install node-fetch
2. Set the following in your entry point:

```js
const semver = require('semver');

if (semver.lt(process.version, '20.0.0')) {
  global.fetch = require('node-fetch');
}
```

#### Headers / Body Timeout Error

This is caused by the internal undici fetch implementation's dispatcher [defaults](https://github.com/nodejs/undici/issues/1373) for the headers and body timeout when performing a request. In the future we will support modifying these properties in a more defined way, but for now, once can override this by setting the global symbol at the beginning of your script:

```js
import { Agent } from 'undici';

globalThis[Symbol.for('undici.globalDispatcher.1')] = new Agent({
  headersTimeout: 0,
  bodyTimeout: 0,
});
```
