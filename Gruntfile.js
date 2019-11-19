module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**', '**', ],
                    dest: 'dist/assets/images', // Destination folder
                }, {
                    expand: true,
                    cwd: 'assets/vendors/js',
                    src: ['**', '**', ],
                    dest: 'dist/assets/vendors/js', // Destination folder
                }],
            }
        },
        uglify: {
            build: {
                options: {
                    banner: "/*! minified version file */\n"
                },
                src: ['*.js', 'assets/js/{,*/}*.js'],
                dest: 'dist/',
                expand: true,
            }

        },
        cssmin: {
            target: {
                options: {
                    banner: "/*! style.min.css file */\n"
                },
                src: ['*.css', 'assets/{,*/}*/{,*/}*.css'],
                dest: 'dist/',
                expand: true,
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    // cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'app/{,*/}*/{,*/}*.html'],
                    dest: 'dist/'
                }]
            }
        },
    });

    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['htmlmin', 'uglify', 'cssmin', 'copy']);

};