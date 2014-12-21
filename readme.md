# node-bpg [![Build Status](https://travis-ci.org/thammin/node-bpg.svg)](https://travis-ci.org/thammin/node-bpg)

> A nodejs module that generating bpg image files by using libbpg (http://bellard.org/bpg/).


## Install

Install with [npm](https://npmjs.org/package/gulp-react)

```
npm install --save-dev node-bpg
```


## Example

```js
var fs = require('fs');
var bpg = require('node-bpg');

fs.readFile('./input.jpg', function(err, data) {
  if (err) throw err;
  
  fs.writeFile('./output.bpg', bpg.encode(data));
});

```


## Test

```js
npm test
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.


## License

MIT