'use strict';

import through from 'through2';
import gutil   from 'gulp-util';
import {exec}  from 'child_process';

const PLUGIN_NAME = 'gulp-git-status';
const STATUS_TYPES = ['modified', 'unchanged', 'untracked'];
const DEFAULT_OPTIONS = {
  excludeStatus: 'modified'
};

export default function(options = DEFAULT_OPTIONS) {

  if ( STATUS_TYPES.indexOf(options.excludeStatus) === -1 ) {
    options.excludeStatus = 'modified';
  }

  const getStatus = function(filePath) {
    const isModifiedRegex = new RegExp('modified', 'gi');
    const isUnchangedRegex = new RegExp('nothing to commit', 'gi');
    const isUntrackedRegex = new RegExp('Untracked files', 'gi');

    return new Promise((resolve, reject) => {
      exec(`git status ${filePath}`, (err, stdout, stderr) => {
        let status;

        if ( err || stderr ) {
          reject();
        } else {
          if ( isModifiedRegex.test(stdout) ) {
            status = 'modified';
          } else if ( isUnchangedRegex.test(stdout) ) {
            status = 'unchanged';
          } else if ( isUntrackedRegex.test(stdout) ) {
            status = 'untracked';
          }

          console.log('file status:', status);

          resolve(status);
        }
      });
    });
  };

  const gitFileStatus = function(file, enc, cb) {
    const stream = this;

    getStatus(file.path).then((status) => {
      if ( status !== options.excludeStatus ) {
        stream.push(file);
      }
      return cb();
    }).catch((err) => {
      stream.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      return cb();
    });

    return stream;
  };

  return through.obj(gitFileStatus, (cb) => {
    return cb();
  });

};