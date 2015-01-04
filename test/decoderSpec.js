var glob = require('glob');
var async = require('neo-async');
var path = require('path');

var outputPath = 'test/fixture/output/';

describe('bpg decoder', function() {
  var bpg = require('../index.js')();

  it('generate PNG image from bpg', function(done) {
    glob('test/fixture/input/*.bpg', {}, function(err, files) {
      if (err) throw err;

      async.each(files, function(file, callback) {
        var basename = path.basename(file);
        // Issue: bpgdec will always ignore `-o` option and write out the files as `out.png`
        bpg.decode(file, outputPath + basename, function(err) {
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
