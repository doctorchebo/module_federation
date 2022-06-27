const deps = require('./package.json').dependencies;

module.exports = {
	name: 'app2',
	exposes: {
		'./index': './src/pages/signin/index',
		'./store': './src/store/store',
	},
	filename: 'remoteEntry.js',
	shared: {
		...deps,
		react: {
			singleton: true,
			requiredVersion: deps['react'],
		},
		'react-dom': {
			singleton: true,
			requiredVersion: deps['react-dom'],
		},
	},
};
