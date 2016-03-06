module.exports = function(grunt) {

    grunt.initConfig({

        //read from package.json to get its name value pair
        pkg: grunt.file.readJSON('package.json'),


        concat: {
            options: {
                separator: '\n//========end of a file======\n\n'
            },
            dist: {
                src: ['app/js/data.js', 'app/js/app.js', 'app/js/controllers/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['concat'],
            },
           options: {
                  spawn: false,
                  livereload: true
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.',
                    keepalive: true,
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },

        //wiredep
        wiredep: {
            task: {
                src: [
                    'app/index.html',
                    'app/scripts/*.js'
                ]
            }
        },

        //for generating dist folder
        bower_concat: {
            all: {
                dest: {
                    js: 'dist/_bower.js',
                    css: 'dist/_bower.css'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'app',
                src: '**',
                dest: 'dist/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['wiredep', 'connect', 'watch']);

};
