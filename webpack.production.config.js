const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'index': './src/components/index.js',
		'main': './src/components/main.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: ''
	},
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 10000,
			automaticNameDelimiter: '_'
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/env' ],
						plugins: [ 'transform-class-properties' ]
					}
				}
			},
			{
				test: /\.hbs$/,
				use: [
					'handlebars-loader'
				]
			}
		]
	},
	plugins: [
		new UglifyJsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/templates/index.hbs',
			chunks: [ 'index' ],
			minify: {
			    collapseWhitespace: true,
			    removeComments: true,
			    removeRedundantAttributes: true,
			    removeScriptTypeAttributes: true,
			    removeStyleLinkTypeAttributes: true,
			    useShortDoctype: true
			},
			title: 'Hello World',
			description: 'Hello World description'
		}),
		new HtmlWebpackPlugin({
			filename: 'main.html',
			template: 'src/templates/index.hbs',
			chunks: [ 'main' ],
			minify: {
			    collapseWhitespace: true,
			    removeComments: true,
			    removeRedundantAttributes: true,
			    removeScriptTypeAttributes: true,
			    removeStyleLinkTypeAttributes: true,
			    useShortDoctype: true
			},
			title: 'Hello World main',
			description: 'Hello World main description'
		})
	]
}