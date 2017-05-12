# node-bpg

> A nodejs wrapper that generating bpg image files by using [pre-compiled libbpg binary](https://github.com/thammin/libbpg-bin).

For more information about libbpg, please visit (http://bellard.org/bpg/).

## Install

Require: `node >=6`

```
npm install --save node-bpg
```


## Example

### encode `.jpg` or `.png` to `.bpg`
```js
const { encode } = require('node-bpg');
const option = {
  qp: 10, // set quantizer parameter
  level: 9 // select the compression level
};

encode('input.jpg', 'output.bpg', option)
  .then(() => {
    // done
  });
```

### decode `.bpg` to `.png` or `.ppm`
```js
const { decode } = require('node-bpg');
const option = {
  bit_depth: 16 // set bit_depth per component (PNG output only)
};

decode('input.bpg', 'output.png', option)
  .then(() => {
    // done
  });
```


## Options

### encode options
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
or refer to [default option](https://github.com/thammin/node-bpg/blob/master/encodeDefault.json).

### decode options
```
bit_depth         PNG output only: use bit_depth per component (8 or 16, default = 8)
information       display information about the image
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