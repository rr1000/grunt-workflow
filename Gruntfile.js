module.exports = function(grunt){

	//NOTE: All compiled assets and files are placed in the build directory
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//Concat all JavaScript files into one app.js file
		concat:{
			dist:{
				src:[
					'assets/js/*.js'
				],
				dest: 'assets/js/app.js'
			}
		},
		//Minify the app.js file
		uglify:{
			build:{
				src: 'assets/js/app.js',
				dest: 'build/assets/js/app-min.js'
			}
		},
		//Compress images
		imagemin:{
			dynamic:{
				files: [{
					expand: true,
					cwd: 'assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/assets/img'
				}]
			}
		},
		//Minify HTML
		htmlmin:{
			dist:{
				options:{
					removeComents: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					minifyJS: true
				},
				files:{
					'build/index.html' : 'index.html',
				}
			}
		},
		//Run tasks on change
		watch:{
			scripts:{
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			}
		}
	});

	//Loads tasks to be run
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	//Run your tasks
	grunt.registerTask('default', ['concat', 'uglify', 'htmlmin', 'imagemin', 'watch']);

}