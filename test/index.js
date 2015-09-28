'use strict';

import sinon         from 'sinon';
import es            from 'event-stream';
import File          from 'vinyl';
import proc          from 'child_process';
import should        from 'should';

import gulpGitStatus from '../lib';

describe('gulp-git-status', function() {

  before(function() {
    this.plugin = gulpGitStatus()
  });

  beforeEach(function() {
    this.fakeFile = new File({
      contents: es.readArray(['stream', 'with', 'those', 'contents']),
      path: '/path/to/file.js'
    });
  });

  it('should return a stream', function() {
    should.exist(this.plugin.on);
    should.exist(this.plugin.write);
  });

  it('should call exec with the correct git command', function(done) {
    this.timeout(5000);

    const plugin = gulpGitStatus();

    sinon.mock(proc).expects('exec').withArgs(`git status ${this.fakeFile.path}`);

    plugin.write(this.fakeFile);

    plugin.on('data', (file) => {
      console.log('data:', file);
      done();
    });
  });

  it('should ignore any files whose Git status matches options.excludeStatus', function(done) {
    done();
  });

  it('should include any files whose Git status does not match options.excludeStatus', function(done) {
    done();
  });

});