# node-bpg

> A nodejs wrapper that generating bpg image files by using pre-compiled libbpg (http://bellard.org/bpg/).


## Install

Install with [npm](https://npmjs.org/package/gulp-react)

```
npm install --save-dev node-bpg
```


## Example

```js
var bpg = require('node-bpg');

bpg.encode('./input.jpg', function(err) {
  if (err) throw err;
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