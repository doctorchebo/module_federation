import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { onLoadSignIn, onLogout } from './action';

/**
 * @returns {Function} - useSessionStore
 */
export function useSessionStore() {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session);

	const onLoadSignInCallback = useCallback(
		(user) => {
			dispatch(onLoadSignIn(user));
		},
		[dispatch]
	);

	const onLogoutCallback = useCallback(() => {
		dispatch(onLogout());
	}, [dispatch]);

	return {
		session,
		onLoadSignIn: onLoadSignInCallback,
		onLogout: onLogoutCallback,
	};
}
