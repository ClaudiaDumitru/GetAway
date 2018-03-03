'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		eslint: 
		{
			gruntfile: 'Gruntfile.js',
			server: ['source/server/**/*.js'],
			ui: ['source/ui/js/*.js', 'source/ui/**/*.vue']
		},
        
        cssmin: {
            style: {
					src: ['build/ui/style/css/*.css'],
					dest: 'build/ui/style/style.css'
				}
        },
		
		copy: {
			server: {
				files: [
					{ expand: true, cwd: 'source/server', src: ['**/*.js', '**/*.json'], dest: 'build/server'},
					{ expand: true, cwd: '', src: ['package.json'], dest: 'build'}
				],
			},

			ui: {
				files: [
					{ expand: true, cwd: 'source/ui', src: ['index.html'], dest: 'build/ui'},
					{ expand: true, cwd: 'source/ui', src:['**/*'], dest: 'build/ui'}
				],
			}
		},

		clean:
		{
			build: ['build'],
		},
		
		browserify: {
			ui : {
				files: {
					'build/ui/js/application.js': 'source/ui/js/application.js'
				}
			},
			options: {
				browserifyOptions:
				{
					
				},
				transform: ['vueify'],
			}
		},
	});

	grunt.loadNpmTasks('gruntify-eslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask ('server', ['eslint:server', 'copy:server']);
	grunt.registerTask ('ui', ['eslint:ui', 'copy:ui', 'cssmin:style', 'browserify']);
	grunt.registerTask ('default', ['ui']);
};

