var path = require('path');
var Shrub = require('../');
var expect = require('expect.js');
var sinon = require('sinon');

describe('filer', function () {
  var shrub;
  var dir = path.resolve(__dirname, './fixtures');
  
  beforeEach(function () {
    shrub = new Shrub(dir);
  });
  
  describe('filter', function () {
    it('collects a set of files recursively based on a given directory', function (done) {
      shrub.filter(function (filePath, stats, cb) {
        cb(true);
      }, function (files) {
        expect(files).to.contain(path.resolve(__dirname, './fixtures/file1.js'));
        expect(files).to.contain(path.resolve(__dirname, './fixtures/file2.js'));
        expect(files).to.contain(path.resolve(__dirname, './fixtures/dir1/file3.js'));
        expect(files).to.contain(path.resolve(__dirname, './fixtures/dir1/dir2/file4.js'));
        expect(files).to.contain(path.resolve(__dirname, './fixtures/dir1/dir3/file5.js'));
        
        done();
      });
    });
    
    it('filters list of files based on filter callback', function (done) {
      shrub.filter(function (filePath, stats, cb) {
        var fullFilePath = path.join(__dirname, './fixtures/file1.js');
        cb(filePath === fullFilePath);
      }, function (files) {
        expect(files).to.have.length(1);
        expect(files).to.contain(path.resolve(__dirname, './fixtures/file1.js'));
        
        done();
      });
    });
  });
  
  describe('each', function () {
    it('executes each callback for each file', function (done) {
      var spy = sinon.spy();
      
      shrub.each(function (filePath, stats, cb) {
        spy();
        cb();
      }, function () {
        expect(spy.callCount).to.equal(5);
        done();
      });
    });
  });
});
