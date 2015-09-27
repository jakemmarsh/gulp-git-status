'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

// const PLUGIN_NAME = 'gulp-git-status';
var DEFAULT_OPTIONS = {};

exports['default'] = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_OPTIONS : arguments[0];

  var gitFileStatus = function gitFileStatus(file, enc, cb) {
    var stream = this;

    // TODO: get git status of file and determine if it should be added
    stream.push(file);
    cb();

    return stream;
  };

  return _through22['default'].obj(gitFileStatus, function (cb) {
    return cb();
  });
};

;
module.exports = exports['default'];