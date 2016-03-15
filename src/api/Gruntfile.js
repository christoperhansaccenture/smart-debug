module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            src: {
                src: ['src/**/*.ts'],
                dest: 'js',
                options: {
                    module: 'systemjs',
                    target: 'es6',
                    sourceMap: true,
                    declaration: false,
                    experimentalDecorators: true,
                    watch: false
                }
            },
            test: {
                src: ['test/**/*.ts'],
                dest: 'js-test',
                options: {
                    module: 'commonjs', //or
                    target: 'es6', //or es3
                    sourceMap: true,
                    declaration: false,
                    experimentalDecorators: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');


    grunt.registerTask('build', ['typescript:src']);

};

