import locale from 'pages/dashboard/sections/programVersions/locale/en.json';
import { programVersionsActionTypes } from './types';

const initialState = {
	title: locale.programVersion,
	status: [],
	programs: [],
	coordinators: [],
	errorMessages: [],
	programVersions: [],
	stages: [],
	trainers: [],
	reports: null,
	fileTypes: '.json',
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	sideBar: false,
};

export const programVersionReducer = (state = initialState, action) => {
	switch (action.type) {
		case programVersionsActionTypes.loading:
			return {
				...state,
				loading: action.payload,
			};
		case programVersionsActionTypes.error:
			return {
				...state,
				errorMessages: action.payload,
			};
		default:
			return state;
	}
};
