import settingsDevelop from './settings.development.json';
import settingsUat from './settings.uat.json';
import settingsProduction from './settings.json';

/**
 * @param {string} mode mode of the project.
 * @returns {object} current settings.
 */
export default function ApiSettings(mode) {
	switch (mode) {
		case 'production':
			return settingsProduction;
		case 'uat':
			return settingsUat;
		case 'development':
			return settingsDevelop;
		default:
			return settingsDevelop;
	}
}
