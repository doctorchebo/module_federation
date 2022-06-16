import {
	setLoading,
	errorAction,
	onLoadStageScoredByScholar,
	onLoadErrorLastStageEvaluationSkills,
	onLoadingLastEvaluationSummary,
	onLoadCountEvents,
	onLoadTrainingsByScholar,
	onLoadScholarStageSummary,
	onLoadLastStageEvaluationSkills,
	onLoadScholarById,
} from '../action';
import { ScholarActions } from '../types';

describe('src/store/scholarSlice/action', () => {
	describe('action responses', () => {
		it('should dispatch setLoading action when the reducer works', () => {
			const mockPayload = {
				loading: true,
			};

			const expectedAction = {
				type: ScholarActions.loading,
				payload: mockPayload,
			};

			expect(setLoading(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadStageScoredByScholar action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onGetStageScoreByScholar,
				payload: mockPayload,
			};

			expect(onLoadStageScoredByScholar(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadErrorLastStageEvaluationSkills action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.errorLastStageEvaluationSkills,
				payload: mockPayload,
			};

			expect(onLoadErrorLastStageEvaluationSkills(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadingLastEvaluationSummary action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.loadingLastEvaluationSummary,
				payload: mockPayload,
			};

			expect(onLoadingLastEvaluationSummary(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadCountEvents action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onCountEvents,
				payload: mockPayload,
			};

			expect(onLoadCountEvents(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadTrainingsByScholar action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onGetTrainingsByScholar,
				payload: mockPayload,
			};

			expect(onLoadTrainingsByScholar(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadScholarStageSummary action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onGetScholarStageSummary,
				payload: mockPayload,
			};

			expect(onLoadScholarStageSummary(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadLastStageEvaluationSkills action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onGetLastStageEvaluationSkills,
				payload: mockPayload,
			};

			expect(onLoadLastStageEvaluationSkills(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch onLoadScholarById action when the reducer works', () => {
			const mockPayload = {
				data: {},
			};

			const expectedAction = {
				type: ScholarActions.onGetScholarById,
				payload: mockPayload,
			};

			expect(onLoadScholarById(mockPayload)).toEqual(expectedAction);
		});
		it('should dispatch errorAction action when the reducer fails', () => {
			const mockPayload = {
				error: 'error',
				message: 'message',
			};

			const expectedAction = {
				type: ScholarActions.error,
				payload: mockPayload,
			};

			expect(errorAction(mockPayload)).toEqual(expectedAction);
		});
	});
});
