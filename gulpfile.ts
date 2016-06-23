
import * as _ from 'lodash';
import { paths } from './gulp/gulp-conf';

let gulp = require('gulp');
let del = require('del');
let typescript = require('gulp-typescript');
let typings = require('gulp-typings');
let install = require('gulp-install');
let tsNode = require('ts-node');

gulp.task('clean:node_modules', _.partial(clean, paths.node_modules));
gulp.task('clean:typings', _.partial(clean, paths.typings));
gulp.task('clean', _.partial(clean, paths.dist));

gulp.task('build:node_modules', gulp.series('clean:node_modules', buildNodeModules));
gulp.task('build:typings', gulp.series('clean:typings', buildTypings));
gulp.task('build', gulp.series(gulp.parallel('clean', 'build:node_modules', 'build:typings'), build));

function clean(path) {
  return del([path]);
}

function build() {
  let tsProject = typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  return gulp.src(['src/**/*.ts'])
      .pipe(typescript(tsProject))
      .pipe(gulp.dest(paths.dist));
}

function buildTypings(){
  return gulp.src('typings.json')
      .pipe(typings());
}

function buildNodeModules(){
  return gulp.src('package.json')
      .pipe(install());
}
