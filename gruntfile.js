var debug = require('debug')('terry_wesite');
var app = require('./app.js');

app.set('port', process.env.PORT || 8100);


module.exports = function(grunt){
    grunt.initConfig({
            pkg:grunt.file.readJSON('package.json'),
    concat:{
        options:{
            seperator:";",
            stripBanners:true,
            banner:'/*! <%= pkg.name %> - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        dist:{
            src:['public/javascripts/app.js'],
            des:'public/javascripts/app.min.js'
        }
    },
        uglify:{
            options:{
                manage:false
            },
            my_target:{
                files:
                    {
                    'public/javascripts/app.min.js':['public/javascripts/app.js']
                }
            }
        },
        cssmin:{
            my_target:{
                files:
                {
                    'public/stylesheets/style.min.css':['public/stylesheets/style.css']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'bin/www'
            }
        }
    });
    grunt.registerTask('server', 'Start a custom web server', function() {
        grunt.log.writeln('Started web server on port 8100');
        app.listen(app.get('port'));
        var server = app.listen(app.get('port'), function() {
            console.log('start port @'+ server.address().port )
            debug('Express server listening on port ' + server.address().port);
        });
    });
    // load nodemon
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default',['nodemon'])



}
