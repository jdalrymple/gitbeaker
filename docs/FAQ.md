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

> **NOTE**: _Using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` will not work with the `gitlab` library. The `rejectUnauthorized` key is the only way to allow insecure certificates to be bypassed._

#### Support for Node v16.18+

Since everything builds off fetch support, applying a poly fill will allow for Node v16.18 instead of 18+. ie:

1. Install node-fetch
2. Set the following in your entry point: `global.fetch = require('node-fetch')`
