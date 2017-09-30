const path = require('path');
module.exports = {
	context: __dirname,
	entry: {
		Script: "./apps/assets/js/Script.js",
		Vendor: "./apps/assets/js/Vendor.js",
	},
	output: {
		path: path.resolve(__dirname, "./apps/temp/js"),
		filename: "Script.js"
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets:[
						['babel-preset-es2015', { modules:false }]
					]
				},
				test: /\.js$/,
				exclude:/node_modules/
			}
		]
	}
}