module.exports = function(grunt){
    grunt.initConfig({
            pkg:grunt.file.readJSON('package.json'),
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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['uglify','cssmin'])
}
