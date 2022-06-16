import {
	loadErrorAction,
	loadProfileAction,
	loadRoleAction,
	loadSignInAction,
	logoutAction,
	signInAction,
} from '../action';
import { ApplicationActions } from '../types';
describe('src/redux/sessionSlice/action', () => {
	describe('loadErrorAction', () => {
		it('should return the loadErrorAction action', () => {
			const payload = {
				error: 'error',
				message: 'message',
			};
			const expectedAction = {
				type: ApplicationActions.error,
				payload,
			};
			expect(loadErrorAction(payload)).toEqual(expectedAction);
		});
		it('should return the loadProfileAction action', () => {
			const payload = {
				profile: {},
			};
			const expectedAction = {
				type: ApplicationActions.profile,
				payload,
			};
			expect(loadProfileAction(payload)).toEqual(expectedAction);
		});
		it('should return the loadRoleAction action', () => {
			const payload = {
				role: {},
			};
			const expectedAction = {
				type: ApplicationActions.role,
				payload,
			};
			expect(loadRoleAction(payload)).toEqual(expectedAction);
		});
		it('should return the loadSignInAction action', () => {
			const payload = {
				signIn: {},
			};
			const expectedAction = {
				type: ApplicationActions.loadSignIn,
				payload,
			};
			expect(loadSignInAction(payload)).toEqual(expectedAction);
		});
		it('should return the logoutAction action', () => {
			const payload = {
				logout: {},
			};
			const expectedAction = {
				type: ApplicationActions.logout,
				payload,
			};
			expect(logoutAction(payload)).toEqual(expectedAction);
		});
		it('should return the signInAction action', () => {
			const payload = {
				signIn: {},
			};
			const expectedAction = {
				type: ApplicationActions.signIn,
				payload,
			};
			expect(signInAction(payload)).toEqual(expectedAction);
		});
	});
});
