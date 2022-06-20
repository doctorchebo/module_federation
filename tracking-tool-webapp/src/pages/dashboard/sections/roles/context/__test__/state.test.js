import { State, Reducer } from '../state';
import { RolesActionTypes } from '../enums';

describe('dashboard/context/state', () => {
	describe('State', () => {
		it('Should return the initial state', () => {
			const actualState = State();
			expect(actualState.roles).toEqual([]);
		});
	});
	describe('Change State', () => {
		let state;
		beforeEach(() => {
			state = {
				roles: [],
			};
		});
		it('onUsersLoad action', () => {
			const newState = Reducer(state, { type: RolesActionTypes.onLoadRoles, payload: [] });
			expect(newState.roles).toEqual([]);
		});
	});
});
