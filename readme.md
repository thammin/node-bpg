# node-bpg

> A nodejs wrapper that generating bpg image files by using pre-compiled libbpg (http://bellard.org/bpg/).


## Install

Install with [npm](https://npmjs.org/package/gulp-react)

```
npm install --save-dev node-bpg
```


## Example

###use with gulp plugin
coming soon..

###use with optional config
```js
var config = {
  qp: 10, // set quantizer parameter
  level: 9 // select the compression level
};
var bpg = require('node-bpg')(config);

bpg.encode('./input.jpg', function(err) {
  if (err) throw err;
});
```


## Options

```
qp                set quantizer parameter (smaller gives better quality, range: 0-51, default = 28)
cfmt              set the preferred chroma format (420, 422, 444, default = 420)
color_space       set the preferred color space (ycbcr, rgb, ycgco, ycbcr_bt709, ycbcr_bt2020, default = ycbcr)
bit_depth         set the bit depth (8 to 12, default = 8)
lossless          enable lossless mode
encoder           select the HEVC encoder (jctvc, default = jctvc)
level             select the compression level (1 = fast, 9 = slow, default = 8)

Advanced options:
alphaq            set quantizer parameter for the alpha channel (default = same as qp value)
premul            store the color with premultiplied alpha
limitedrange      encode the color data with the limited range of video
hash              include MD5 hash in HEVC bitstream
keepmetadata      keep the metadata (from JPEG: EXIF, ICC profile, XMP, from PNG: ICC profile)
verbose           show debug messages
```
or refer to [default option](https://github.com/thammin/node-bpg/blob/master/config.json).


## Test

```js
npm test
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.


## License

MIT