const deps = require('./package.json').dependencies;

module.exports = {
	name: 'app2',
	exposes: {
		'./index': './src/pages/signIn/index',
		'./store': './src/store/store',
	},
	remotes: {
		app2: 'app2@http://localhost:3002/remoteEntry.js',
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
