var fs = require('fs');
var path = require('path');
var walk = require('walk');

var Timber = function (dir) {
  this.dir = dir;
};

Timber.prototype.each = function (filterFn, callback) {
  var walker = walk.walk(this.dir, {
    followLinks: false
  });
  
  walker.on('file', function (root, stats, next) {
    var fullFilePath = path.join(root, stats.name);
    
    filterFn(fullFilePath, stats, function () {
      next();
    });
  });
  
  walker.on('end', function () {
    callback();
  });
};

Timber.prototype.filter = function (filterFn, callback) {
  var _files = [];
  
  this.each(function (filePath, stats, cb) {
    filterFn(filePath, stats, function (matched) {
      if (matched) _files.push(filePath);
      cb();
    });
  }, function () {
    callback(_files);
  });
};

module.exports = Timber;