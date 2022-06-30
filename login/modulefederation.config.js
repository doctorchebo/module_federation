const deps = require('./package.json').dependencies;

module.exports = {
	name: 'login',
	exposes: {
		'./index': './src/pages/signIn/index',
		'./store': './src/store/store',
	},
	remotes: {
		login: 'login@http://localhost:3002/remoteEntry.js',
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
