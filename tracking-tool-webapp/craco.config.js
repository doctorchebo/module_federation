const path = require('path');
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
	},
};
