'use strict';
var spawn = require('child_process').spawn;

module.exports = function() {

  // TODO: initialize with options
  function getArgs(filePath) {
    return ['-o', filePath.replace(/\.(png|jpg|jpeg)$/i, '.bpg')];
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

    var child = spawn('./libbpg/bpgenc', args);
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

  return {
    encode: encode,
    decode: null
  };
};