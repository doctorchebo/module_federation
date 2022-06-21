const path = require('path');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
	devServer: {
		port: 3000,
	},
	plugins: [
		{
			plugin: require('./craco-plugins/module-federation'),
		},
	],
	webpack: {
		plugins: {
			add: [
				new webpack.ProvidePlugin({
					process: 'process/browser',
				}),
				new webpack.ProvidePlugin({
					Buffer: ['buffer', 'Buffer'],
				}),
			],
		},
		alias: {
			api: path.resolve(__dirname, 'src/api/'),
			application: path.resolve(__dirname, 'src/application/'),
			assets: path.resolve(__dirname, 'src/assets/'),
			components: path.resolve(__dirname, 'src/components/'),
			helpers: path.resolve(__dirname, 'src/helpers/'),
			pages: path.resolve(__dirname, 'src/pages/'),
			routes: path.resolve(__dirname, 'src/application/routes/'),
			services: path.resolve(__dirname, 'src/services/'),
			exceptions: path.resolve(__dirname, 'src/exceptions/'),
			settings: path.resolve(__dirname, 'src/settings/'),
			hooks: path.resolve(__dirname, 'src/hooks/'),
		},
		configure: {
			resolve: {
				fallback: {
					assert: require.resolve('assert'),
					os: require.resolve('os-browserify/browser'),
					buffer: require.resolve('buffer'),
					path: require.resolve('path-browserify'),
					zlib: require.resolve('browserify-zlib'),
					crypto: require.resolve('crypto-browserify'),
					stream: require.resolve('stream-browserify'),
					http: require.resolve('stream-http'),
					https: require.resolve('https-browserify'),
					url: require.resolve('url'),
					fs: require.resolve('browserify-fs'),
				},
			},
		},
	},
};
