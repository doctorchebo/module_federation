import { combineReducers } from 'redux';
import { sessionReducer } from './sessionSlice/reducer';
import { scholarReducer } from './scholarSlice/reducer';
import { settingsReducer } from './settingsSlice/reducer';
import { eventsReducer } from './eventsSlice/reducer';
import { programVersionReducer } from './programVersionSlice/reducer';

const rootReducer = combineReducers({
	session: sessionReducer,
	scholar: scholarReducer,
	settings: settingsReducer,
	events: eventsReducer,
	programVersion: programVersionReducer,
});

export default rootReducer;
