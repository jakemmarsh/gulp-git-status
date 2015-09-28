'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _child_process = require('child_process');

var PLUGIN_NAME = 'gulp-git-status';
var STATUS_TYPES = ['modified', 'unchanged', 'untracked'];
var DEFAULT_OPTIONS = {
  excludeStatus: 'modified'
};

exports['default'] = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_OPTIONS : arguments[0];

  if (STATUS_TYPES.indexOf(options.excludeStatus) === -1) {
    options.excludeStatus = 'modified';
  }

  var getStatus = function getStatus(filePath) {
    var isModifiedRegex = new RegExp('modified', 'gi');
    var isUnchangedRegex = new RegExp('nothing to commit', 'gi');
    var isUntrackedRegex = new RegExp('untracked files', 'gi');

    return new Promise(function (resolve, reject) {
      (0, _child_process.exec)('git status ' + filePath, function (err, stdout, stderr) {
        var status = undefined;

        if (err || stderr) {
          reject();
        } else {
          if (isModifiedRegex.test(stdout)) {
            status = 'modified';
          } else if (isUnchangedRegex.test(stdout)) {
            status = 'unchanged';
          } else if (isUntrackedRegex.test(stdout)) {
            status = 'untracked';
          }

          resolve(status);
        }
      });
    });
  };

  var gitFileStatus = function gitFileStatus(file, enc, cb) {
    var stream = this;

    getStatus(file.path).then(function (status) {
      if (status !== options.excludeStatus) {
        stream.push(file);
      }
      return cb();
    })['catch'](function (err) {
      stream.emit('error', new _gulpUtil2['default'].PluginError(PLUGIN_NAME, err));
      return cb();
    });

    return stream;
  };

  return _through22['default'].obj(gitFileStatus, function (cb) {
    return cb();
  });
};

;
module.exports = exports['default'];