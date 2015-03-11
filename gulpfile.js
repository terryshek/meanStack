
var debug = require('debug')('terry_wesite');
var app = require('./app.js');

//app.set('port', process.env.PORT || 8100);
//
//var server = app.listen(app.get('port'), function() {
//    console.log('start port @'+ server.address().port )
//    debug('Express server listening on port ' + server.address().port);
//});

var gulp = require('gulp');
var uglify = require('gulp-uglify');
// include plug-ins
var jshint = require('gulp-jshint');

gulp.task('fuck', function() {
    console.log( 'fuck' );
});
// JS hint task
gulp.task('jshint', function() {
    gulp.src(['public/javascripts/*.js','public/javascripts/controller/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
var startExpress = function (){

    app.set('port', process.env.PORT || 8100);

    var server = app.listen(app.get('port'), function() {
        console.log('start port @'+ server.address().port )
        debug('Express server listening on port ' + server.address().port);
    });
}
gulp.task('startSever', startExpress());
gulp.task('default', ['startSever','jshint', 'fuck'])
