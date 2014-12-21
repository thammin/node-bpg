var bpg = require('../index.js')();
var glob = require('glob');
var async = require('neo-async');
var path = require('path');

describe('bpg encoder', function() {
  it('generate bpg image from JPEG', function() {
    var outputPath = 'test/fixture/output/';
    glob('test/fixture/input/*.jpg', {}, function(err, files) {
      if (err) throw err;

      async.eachLimit(files, 3, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        console.log('All files have been processed successfully');
      });
    });
  });

  it('generate bpg image from PNG', function() {
    var outputPath = 'test/fixture/output/';
    glob('test/fixture/input/*.png', {}, function(err, files) {
      if (err) throw err;

      async.eachLimit(files, 3, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        console.log('All files have been processed successfully');
      });
    });
  });
});