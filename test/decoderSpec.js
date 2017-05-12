const glob = require('glob');
const { map } = require('aigle');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const readChunk = require('read-chunk');
const isPng = require('is-png');
const { decode } = require('..');

test.cb('bpgdec: should generate png image from bpg', t => {
  glob(path.resolve(__dirname, 'fixture/*.bpg'), {}, (err, files) => {
    t.ifError(err);

    map(files, file => {
      const temp = tempy.file({ extension: 'png' });
      return decode(file, temp).then(() => temp);
    })
    .map(file => {
      var buffer = readChunk.sync(file, 0, 8);
      t.true(isPng(buffer));
    }).then(() => t.end());
  });
});
