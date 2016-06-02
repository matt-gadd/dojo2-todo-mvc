module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt);
    
	grunt.registerTask('dev', [
		'ts:dev',
		'updateTsconfig'
	]);
};
