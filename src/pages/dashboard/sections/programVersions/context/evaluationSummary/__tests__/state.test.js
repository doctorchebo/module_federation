import { act } from 'react-dom/test-utils';
import { EvaluationSummaryActionTypes } from '../enums';
import { Reducer } from '../state';

describe('ProgramVersions/context/actions', () => {
	describe('Handling ProgramVersion files', () => {
		it('Should save the program version in state.programVersion', async () => {
			const mockAction = {
				type: EvaluationSummaryActionTypes.loadProgramVersion,
				payload: [
					{
						id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
						name: 'Dev32',
					},
				],
			};

			const state = function State() {
				return {
					errorMessages: [],
					loading: false,
					programVersion: [],
					scholars: null,
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.programVersion).toBe(mockAction.payload);
		});

		it('Should save the scholars in state.scholars', async () => {
			const mockAction = {
				type: EvaluationSummaryActionTypes.loadScholars,
				payload: [
					{
						pendingScholars: {
							id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
							name: 'scholar 1 ',
						},
					},
				],
			};

			const state = function State() {
				return {
					errorMessages: [],
					loading: false,
					programVersion: [],
					scholars: null,
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.pendingScholars).toBe(mockAction.payload.pendingScholars);
		});

		it('Should change loading to true', async () => {
			const mockAction = {
				type: EvaluationSummaryActionTypes.loading,
				payload: [true],
			};

			const state = function State() {
				return {
					errorMessages: [],
					loading: false,
					programVersion: [],
					scholars: null,
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.loading).toBeTruthy();
		});

		it('Should save an error', async () => {
			const mockAction = {
				type: EvaluationSummaryActionTypes.error,
				payload: ['error'],
			};

			const state = function State() {
				return {
					errorMessages: [],
					loading: false,
					programVersion: [],
					scholars: null,
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.errorMessages).toBe(mockAction.payload);
		});
	});
});
