var glob = require('glob');
var async = require('neo-async');
var path = require('path');

var outputPath = 'test/fixture/output/';

describe('bpg encoder without optional config', function() {
  var bpg = require('../index.js')();

  it('generate bpg image from JPEG', function(done) {
    glob('test/fixture/input/*.jpg', {}, function(err, files) {
      if (err) throw err;

      async.each(files, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        done();
      });
    });
  });

  it('generate bpg image from PNG', function(done) {
    glob('test/fixture/input/*.png', {}, function(err, files) {
      if (err) throw err;

      async.each(files, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        done();
      });
    });
  });
});

describe('bpg encoder with optional config', function() {
  // high quality
  var config = {
    qp: 0,
    level: 9
  };
  var bpg = require('../index.js')(config);

  it('generate bpg image from JPEG', function(done) {
    glob('test/fixture/input/*.jpg', {}, function(err, files) {
      if (err) throw err;

      async.each(files, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + 'HQ-' + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        done();
      });
    });
  });

  it('generate bpg image from PNG', function(done) {
    glob('test/fixture/input/*.png', {}, function(err, files) {
      if (err) throw err;

      async.each(files, function(file, callback) {
        var basename = path.basename(file);
        bpg.encode(file, outputPath + 'HQ-' + basename, function(err) {
          if (err) throw err;
          callback();
        });
      }, function(err) {
        if (err) throw err;
        done();
      });
    });
  });
});