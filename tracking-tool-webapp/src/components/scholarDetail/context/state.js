import produce from 'immer';
import { ScholarDetailActions } from './enums';

/**
 *
 * @returns {object} - Context Initial State.
 */
export function State() {
	return {
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
}

/**
 *
 * @param {object} state - actual state.
 * @param {object} action - action to change the state.
 * @returns {object} - new state.
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case ScholarDetailActions.OnGetScholarById:
			return produce(state, (draft) => {
				draft.data = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.Loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case ScholarDetailActions.LoadingLastEvaluationSummary:
			return produce(state, (draft) => {
				draft.loadingLastEvaluationSummary = payload;
			});
		case ScholarDetailActions.Error:
			return produce(state, (draft) => {
				draft.error = payload;
				draft.success = false;
				draft.loading = false;
			});
		case ScholarDetailActions.ErrorLastStageEvaluationSkills:
			return produce(state, (draft) => {
				draft.errorLastEvaluationSummary = true;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.OnGetScholarStageSummary:
			return produce(state, (draft) => {
				draft.stageSummary = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.OnGetTrainingsByScholar:
			return produce(state, (draft) => {
				draft.trainnings = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.onCountEvents:
			return produce(state, (draft) => {
				draft.eventsSummary = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.OnGetLastStageEvaluationSkills:
			return produce(state, (draft) => {
				draft.lastEvaluationSummary = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.OnGetStageScoreByScholar:
			return produce(state, (draft) => {
				draft.stageScore = payload;
				draft.success = true;
				draft.loading = false;
			});
		default:
			return state;
	}
}
