'use strict';
const { spawn } = require('child_process');
const path = require('path');
const libbpgBin = require('libbpg-bin');

// set EventEmitters to unlimited
process.stdout.setMaxListeners(Infinity);
process.stderr.setMaxListeners(Infinity);

const flags = {
  bpgenc: {
    qp: '-q',
    cfmt: '-f',
    color_space: '-c',
    bit_depth: '-b',
    lossless: '-lossless',
    encoder: '-e',
    level: '-m',
    alphaq: '-alphaq',
    premul: '-premul',
    limitedrange: '-limitedrange',
    hash: '-hash',
    keepmetadata: '-keepmetadata',
    verbose: '-v'
  },
  bpgdec: {
    information: '-i',
    bit_depth: '-b'
  }
};

function configToArgs(config, type) {
  return Object
    .keys(config)
    .map(key => {
      if (!flags[type][key]) {
        return;
      }

      let args = [flags[type][key]];
      typeof config[key] !== 'boolean' && args.push(config[key]);
      return args;
    })
    .reduce((all, opt) => all.concat(opt), [])
    .filter(chunk => chunk !== undefined);
}

function exportWrapper(type) {
  return function(input, output, config = {}, cb) {
    return new Promise((resolve, reject) => {
      if (!input || !output) {
        (cb || reject)(new Error('Invalid input or output filepath.'));
      }
      let args = ['-o', output].concat(configToArgs(config, type)).concat(input);

      const child = spawn(libbpgBin[type], args);
      child.on('exit', code => {
        if (code !== 0) {
          (cb || reject)(new Error(`${type} exited with non-zero code.`));
        } else {
          (cb || resolve)();
        }
      });

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    });
  };
}

module.exports = {
  encode: exportWrapper('bpgenc'),
  decode: exportWrapper('bpgdec')
};
