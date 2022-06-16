import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ActionFactory from './actions';

const Profile = React.createContext();
const ProfileDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function ProfileProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<Profile.Provider value={value}>
			<ProfileDispatch.Provider value={actions}>{children}</ProfileDispatch.Provider>
		</Profile.Provider>
	);
}

ProfileProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useProfileContext() {
	const state = useContext(Profile);
	const actions = useContext(ProfileDispatch);

	return [state, actions];
}
