import produce from 'immer';
import { ScholarEvaluationsActionTypes } from './enums';

/**
 * @returns {object} Init State.
 */
export function State() {
	return {
		approvals: [],
		loadingApprovals: false,
		errorMessages: [],
		evaluation: null,
		loading: false,
		scholarId: '',
		stageId: '',
		scholar: null,
		stages: null,
		currentStage: null,
	};
}

/**
 * @param {object} state Actual State.
 * @param {object} action Action perfomed.
 * @returns {object} New State.
 */
export function Reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case ScholarEvaluationsActionTypes.loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case ScholarEvaluationsActionTypes.loadScholar:
			return produce(state, (draft) => {
				draft.scholar = payload;
			});
		case ScholarEvaluationsActionTypes.loadScholarId:
			return produce(state, (draft) => {
				draft.scholarId = payload;
			});
		case ScholarEvaluationsActionTypes.loadScholarEvaluation:
			return produce(state, (draft) => {
				draft.evaluation = payload;
			});
		case ScholarEvaluationsActionTypes.loadStageId:
			return produce(state, (draft) => {
				draft.stageId = payload;
			});
		case ScholarEvaluationsActionTypes.loadStages:
			return produce(state, (draft) => {
				draft.stages = payload;
			});
		case ScholarEvaluationsActionTypes.error:
			return produce(state, (draft) => {
				draft.errorMessages = payload;
			});
		case ScholarEvaluationsActionTypes.loadApprovals:
			return produce(state, (draft) => {
				draft.approvals = payload;
			});
		case ScholarEvaluationsActionTypes.checkApproval:
			return produce(state, (draft) => {
				draft.approvals = payload;
			});
		case ScholarEvaluationsActionTypes.setCurrentStage:
			return produce(state, (draft) => {
				draft.currentStage = payload;
			});
		case ScholarEvaluationsActionTypes.loadingApprovals:
			return produce(state, (draft) => {
				draft.loadingApprovals = payload;
			});
		default:
			return state;
	}
}
