import { act } from 'react-dom/test-utils';
import { ProgramVersionDetailsActionTypes } from '../enums';
import { Reducer } from '../state';

describe('ProgramVersions/context/ProgramVersionDetails', () => {
	describe('Handling ProgramVersionDetail state', () => {
		it('Should save the program version in state.programVersion', async () => {
			const mockAction = {
				type: ProgramVersionDetailsActionTypes.loadProgramVersion,
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
					programVersion: [],
					activities: [],
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.programVersion).toBe(mockAction.payload);
		});

		it('Should save the activities in state.activities', async () => {
			const mockAction = {
				type: ProgramVersionDetailsActionTypes.loadActivities,
				payload: [
					{
						id: 'be26cc70-9d07-11ec-b909-0242ac120002',
						activityType: {
							id: '7a81f304-9ce0-11ec-b909-0242ac120002',
							description: 'Postulation',
						},
						startDateTime: '2022-01-12T10:00:00',
						endDateTime: '2022-01-12T11:00:00',
						isCompleted: false,
						idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
					},
				],
			};

			const state = function State() {
				return {
					errorMessages: [],
					programVersion: [],
					activities: [],
				};
			};

			await act(async () => {
				await Reducer(state, mockAction);
			});

			expect(state.activities).toBe(mockAction.payload);
		});

		it('Should save an error', async () => {
			const mockAction = {
				type: ProgramVersionDetailsActionTypes.error,
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
