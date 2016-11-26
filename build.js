var webpack = require('webpack');

//////////

var webpackConfigModule = {
	loaders: [
		{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}
	]
};

var config = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'writeInt.js',
		libraryTarget: 'umd',
		library: 'writeInt'
	},
	module: webpackConfigModule
};

var configMin = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'writeInt.min.js',
		libraryTarget: 'umd',
		library: 'writeInt'
	},
	module: webpackConfigModule,
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};

//////////

var compiler = webpack(config);

var compilerMin = webpack(configMin);

//////////

compiler.run(function(err, stats) {
	if (err) {
		console.log(err);
	}
});

compilerMin.run(function(err, stats) {
	if (err) {
		console.log(err);
	}
});
