# gulp-git-status

A Gulp plugin for selectively including source files based on their Git status.

## Usage

First, install `gulp-git-status` as a development dependency:

```
npm install --save-dev gulp-git-status
```

Then, add it to your Gulp task:

```javascript
import gulp          from 'gulp';
import gulpGitStatus from 'gulp-git-status';

gulp.task('moveFiles', () => {
  gulp.src('lib/*')
    .pipe(gulpGitStatus({
      excludeStatus: 'modified'
    }))
    .pipe(gulp.dest('./'));
});
```

## API

### gulpGitStatus(options)

#### options.excludeStatus

**Type:** `String`

**Default:** "modified"

**Possible values:** `["modified", "unchanged", "untracked"]`

The Git file status to exclude from your piped files.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
