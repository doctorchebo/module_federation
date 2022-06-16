import { State, Reducer } from '../state';
import { UsersActionTypes } from '../enums';

describe('dashboard/context/state', () => {
	describe('State', () => {
		it('Should return the initial state', () => {
			const actualState = State();
			expect(actualState.users).toEqual([]);
		});
	});
	describe('Change State', () => {
		let state;
		beforeEach(() => {
			state = {
				users: [],
				errorMessages: [],
			};
		});
		it('onUsersLoad action', () => {
			const newState = Reducer(state, { type: UsersActionTypes.OnUsersLoad, payload: [] });
			expect(newState.users).toEqual([]);
		});
		it('onError action', () => {
			const newState = Reducer(state, { type: UsersActionTypes.Error, payload: ['error'] });
			expect(newState.errorMessages).toEqual(['error']);
		});
	});
});
