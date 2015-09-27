'use strict';

import through from 'through2';
import gutil   from 'gulp-util';

// const PLUGIN_NAME = 'gulp-git-status';
const DEFAULT_OPTIONS = {};

export default function(options = DEFAULT_OPTIONS) {

  const gitFileStatus = function(file, enc, cb) {
    const stream = this;

    // TODO: get git status of file and determine if it should be added
    stream.push(file);
    cb();

    return stream;
  };

  return through.obj(gitFileStatus, (cb) => {
    return cb();
  });

};