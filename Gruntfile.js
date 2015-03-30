module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'src/**/*.js'
			],
			options: {
				ignores: [],
				curly: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					console: true,
					exports: true,
					require: true
				},
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			build: {
				files: {
					'dist/blackjack-<%= pkg.version %>.min.js': ['src/**/*.js']
				}
			},
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);
};