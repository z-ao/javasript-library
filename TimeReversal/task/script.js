import gulp             from 'gulp';
import webpack          from 'webpack';
import gulpWebpack      from 'webpack-stream';
import named            from 'vinyl-named';
import rename           from 'gulp-rename';
import uglify           from 'gulp-uglify';
import {log, colors}    from 'gulp-util';

let DEVPATH     = './app';
let PUBLICPATH  = './public';

gulp.task('scripts', () => {
    return gulp.src([DEVPATH + '/js/*.js'])
        //生成的文件名能够和原文件对上
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest(PUBLICPATH + '/js'))
        .pipe(rename({
            suffix: '.min'      //后缀
        }))
        .pipe(uglify({
            compress: {
                properties: false
            },
            output: {
                'quote_keys': true
            }
        }))
        .pipe(gulp.dest(PUBLICPATH + '/js'))
})