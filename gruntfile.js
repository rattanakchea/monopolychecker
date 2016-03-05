var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    app: 'app',
    dist: 'dist'
}

module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        config: config,
        pkg: config.pkg,
        bower: { directory: 'dist' },
        copy: {
            main: {
                expand: true,
                cwd: 'app',
                src: '**',
                dest: 'dist/'
            }
        },

        bower_concat: {
            all: {
                dest: {
                    js: 'dist/_bower.js',
                    css: 'dist/_bower.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('serve', [
        'copy',
    ]);
};
