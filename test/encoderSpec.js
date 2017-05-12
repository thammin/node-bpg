const glob = require('glob');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const { map } = require('aigle');
const { encode } = require('..');
const isBpg = require('is-bpg');
const readChunk = require('read-chunk');

test.cb('bpgenc: should generate bpg image from png/jpg', t => {
  glob(path.resolve(__dirname, 'fixture/*.@(png|jpg)'), {}, (err, files) => {
    t.ifError(err);
    
    map(files, file => {
      const temp = tempy.file({ extension: 'bpg' });
      return encode(file, temp).then(() => temp);
    })
    .map(file => {
      var buffer = readChunk.sync(file, 0, 4);
      t.true(isBpg(buffer));
    }).then(() => t.end());
  });
});

test.cb('bpgenc: should working with config', t => {
  var config = {
    qp: 0,
    level: 9
  };

  glob(path.resolve(__dirname, 'fixture/*.@(png|jpg)'), {}, (err, files) => {
    t.ifError(err);
    
    map(files, file => {
      const temp = tempy.file({ extension: 'bpg' });
      return encode(file, temp, config).then(() => temp);
    })
    .map(file => {
      var buffer = readChunk.sync(file, 0, 4);
      t.true(isBpg(buffer));
    }).then(() => t.end());
  });
});
