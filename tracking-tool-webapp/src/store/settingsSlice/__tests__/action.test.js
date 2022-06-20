import { errorAction, getGradesAction, loadingAction, updateGradeAction } from '../action';
import { SettingsActions } from '../types';

describe('src/store/settingsSlice/action', () => {
	describe('action responses', () => {
		it('should dispatch loadingAction action', () => {
			const payload = {
				updated: true,
			};
			const expectedAction = {
				type: SettingsActions.Loading,
				payload,
			};

			expect(loadingAction(payload)).toEqual(expectedAction);
		});
		it('should dispatch ErrorAction action', () => {
			const payload = {
				error: 'error',
				message: 'message',
			};
			const expectedAction = {
				type: SettingsActions.Error,
				payload,
			};

			expect(errorAction(payload)).toEqual(expectedAction);
		});
		it('should dispatch getGradesAction action', () => {
			const payload = {
				allGrades: [
					{
						id: 1,
						name: 'A',
						color: '#ff0000',
						value: 1,
					},
				],
			};
			const expectedAction = {
				type: SettingsActions.OnGetGrades,
				payload,
			};

			expect(getGradesAction(payload)).toEqual(expectedAction);
		});
		it('should dispatch updateGradeAction action', () => {
			const payload = {
				updated: true,
			};
			const expectedAction = {
				type: SettingsActions.OnUpdateGrades,
				payload,
			};

			expect(updateGradeAction(payload)).toEqual(expectedAction);
		});
	});
});
