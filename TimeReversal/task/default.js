import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('default', gulpSequence('less', 'scripts'));