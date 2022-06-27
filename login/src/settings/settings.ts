import settingsDevelop from './settings.development.json';
import settingsUat from './settings.uat.json';
import settingsProduction from './settings.json';

export default function ApiSettings(mode: any) {
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
