'use strict';
var spawn = require('child_process').spawn;
var path = require('path');

// set EventEmitters to unlimited
process.stdout.setMaxListeners(Infinity);
process.stderr.setMaxListeners(Infinity);

module.exports = function(options) {

  var optionFlags = {
    'qp': '-q',
    'cfmt': '-f',
    'color_space': '-c',
    'bit_depth': '-b',
    'lossless': '-lossless',
    'encoder': '-e',
    'level': '-m',
    'alphaq': '-alphaq',
    'premul': '-premul',
    'limitedrange': '-limitedrange',
    'hash': '-hash',
    'keepmetadata': '-keepmetadata',
    'verbose': '-v'
  };

  var config = options || require('./config.json');

  function getArgs(filePath) {
    var baseArgs = ['-o', filePath.replace(/\.(png|jpg|jpeg)$/i, '.bpg')];

    Object.keys(config).forEach(function(option) {
      if (!optionFlags.hasOwnProperty(option)) return false;

      if (typeof config[option] !== 'boolean') {
        Array.prototype.push.apply(baseArgs, [optionFlags[option], config[option]]);
      } else if (config[option] === 'true') {
        baseArgs.push(optionFlags[option]);
      }
    });

    return baseArgs;
  }

  function encode(inputFilePath, outputFilePath, callback) {
    var args = [];

    if (!inputFilePath) {
      callback(new Error('Invalid input filepath'));
    } else {
      args.push(inputFilePath);
    }

    if (!outputFilePath) {
      Array.prototype.push.apply(args, getArgs(inputFilePath));
    } else {
      Array.prototype.push.apply(args, getArgs(outputFilePath));
    }

    var child = spawn(path.resolve(__dirname, 'libbpg/bpgenc'), args);
    child.on('exit', function(code) {
      if (code !== 0) {
        callback(new Error('Process bpgenc exited with non-zero code'));
      } else {
        callback();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  function decode(inputFilePath, outputFilePath, callback) {
    var args = [];

    if (!inputFilePath) {
      callback(new Error('Invalid input filepath'));
    } else {
      args.push(inputFilePath);
    }

    if (!outputFilePath) {
      Array.prototype.push.apply(args, ['-o', inputFilePath.replace(/\.bpg$/i, '.png')]);
    } else {
      Array.prototype.push.apply(args, ['-o', outputFilePath.replace(/\.bpg$/i, '.png')]);
    }

    var child = spawn(path.resolve(__dirname, 'libbpg/bpgdec'), args);
    child.on('exit', function(code) {
      if (code !== 0) {
        callback(new Error('Process bpgdec exited with non-zero code'));
      } else {
        callback();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  return {
    encode: encode,
    decode: decode
  };
};