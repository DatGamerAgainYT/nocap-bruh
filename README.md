# nocap-bruh
A captcha module for NodeJS.

# Example
```js
const noCap = require('nocap-bruh');

noCap.createCaptcha('buffer', function(image, text){
    // Do something with the buffer and text.
});
```
