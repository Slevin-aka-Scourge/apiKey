# apiKey
Installation
------------

    npm install Slevin-aka-Scourge/apiKey



Usage
-----
### ESM
```js
import {ApiKey} from "apikey"
```

Example:

```js
import {ApiKey} from "apikey";
const api=new ApiKey();
const test=await api.getKey("Creative Upscaler");
console.log(test)
```