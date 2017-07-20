import gulp             from 'gulp';
import path             from 'path';
import less             from 'gulp-less';
import LessAutoprefix   from 'less-plugin-autoprefix';
import Cssmin           from 'gulp-cssmin';
import rename           from 'gulp-rename';

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] })

let DEVPATH     = './app';
let PUBLICPATH  = './public';

gulp.task('less', () => {
    return gulp.src(DEVPATH + '/less/*.less')
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ],
                    plugins: [autoprefix]
                }))
                .pipe(gulp.dest(PUBLICPATH + '/css'))
                //压缩css
                .pipe(Cssmin())
                .pipe(rename({
                    suffix: '.min'      //后缀
                }))
                .pipe(gulp.dest(PUBLICPATH + '/css'));

})