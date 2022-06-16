import { ScholarActions } from './types';

const initialState = {
	data: undefined,
	stageSummary: undefined,
	error: undefined,
	lastEvaluationSummary: [],
	errorLastEvaluationSummary: false,
	loading: true,
	loadingLastEvaluationSummary: true,
	success: true,
	trainnings: [],
	stageScore: null,
	eventsSummary: [],
};

export const scholarReducer = (state = initialState, action) => {
	switch (action.type) {
		case ScholarActions.onGetScholarById:
			return {
				...state,
				selectedScholar: action.payload,
				success: true,
				loading: false,
			};
		case ScholarActions.loading:
			return {
				...state,
				loading: action.payload,
			};
		case ScholarActions.loadingLastEvaluationSummary:
			return {
				...state,
				loadingLastEvaluationSummary: action.payload,
			};
		case ScholarActions.error:
			return {
				...state,
				error: action.payload,
				success: false,
				loading: false,
			};
		case ScholarActions.errorLastStageEvaluationSkills:
			return {
				...state,
				errorLastEvaluationSummary: true,
				success: true,
				loading: false,
			};
		case ScholarActions.onGetScholarStageSummary:
			return {
				...state,
				stageSummary: action.payload,
				success: true,
				loading: false,
			};
		case ScholarActions.onGetTrainingsByScholar:
			return {
				...state,
				trainnings: action.payload,
				success: true,
				loading: false,
			};
		case ScholarActions.onCountEvents:
			return {
				...state,
				eventsSummary: action.payload,
				success: true,
				loading: false,
			};
		case ScholarActions.onGetLastStageEvaluationSkills:
			return {
				...state,
				lastEvaluationSummary: action.payload,
				success: true,
				loading: false,
			};
		case ScholarActions.onGetStageScoreByScholar:
			return {
				...state,
				stageScore: action.payload,
				success: true,
				loading: false,
			};
		default:
			return state;
	}
};
