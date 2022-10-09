# nocap-bruh
A captcha module for NodeJS.
Note: This was made for fun and probably should not be used for security measures.

# Example
```js
const noCap = require('nocap-bruh');

noCap.createCaptcha('buffer', function(image, text){
    // Do something with the buffer and text.
});
```
