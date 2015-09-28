'use strict';

import sinon         from 'sinon';
import es            from 'event-stream';
import File          from 'vinyl';
import proc          from 'child_process';
import should        from 'should';

import gulpGitStatus from '../lib';

describe('gulp-git-status', function() {

  before(function() {
    this.plugin = gulpGitStatus();
  });

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
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
    const plugin = gulpGitStatus();
    const stub = this.sandbox.stub(proc, 'exec');

    stub.yields(null, 'git status result', null);
    plugin.write(this.fakeFile);

    plugin.on('data', () => {
      sinon.assert.calledWith(stub.firstCall, `git status ${this.fakeFile.path}`);
      done();
    });
  });

  it('should ignore any files whose Git status matches options.excludeStatus', function(done) {
    const plugin = gulpGitStatus({ excludeStatus: 'modified' });
    const stub = this.sandbox.stub(proc, 'exec');

    stub.yields(null, 'modified', null);
    this.sandbox.mock(plugin).expects('on').withArgs('data', sinon.match.any).never();

    plugin.write(this.fakeFile);
    setTimeout(done, 500);
  });

  it('should include any files whose Git status does not match options.excludeStatus', function(done) {
    const plugin = gulpGitStatus({ excludeStatus: 'modified' });
    const stub = this.sandbox.stub(proc, 'exec');

    stub.yields(null, 'unchanged', null);
    plugin.write(this.fakeFile);

    plugin.on('data', (pipedFile) => {
      pipedFile.should.eql(this.fakeFile);
      done();
    });
  });

  afterEach(function() {
    if ( this.sandbox ) { this.sandbox.restore(); }
  });

});