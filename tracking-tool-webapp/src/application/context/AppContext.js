import React, { useState, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ApplicationActionFactory from './actions';
import { showWarningToast } from 'helpers/toast';
import { IntlProvider } from 'react-intl';

const Application = React.createContext();
const ApplicationDispatch = React.createContext();

/**
 *
 * @param {object} props -
 * @returns {React.Provider} -
 */
export function ApplicationDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(ApplicationActionFactory(dispatch));

	useEffect(() => {
		actions.onSessionRestore();
	}, []);

	useEffect(() => {
		if (value.errorMessages.length > 0 && !value.isMain) {
			value.errorMessages.forEach((message) =>
				showWarningToast({
					title: message,
				})
			);
			actions.onError([]);
		}
	}, [value.errorMessages]);

	return (
		<Application.Provider value={value}>
			<ApplicationDispatch.Provider value={actions}>
				<IntlProvider locale={value.locale} messages={value.messages}>
					{children}
				</IntlProvider>
			</ApplicationDispatch.Provider>
		</Application.Provider>
	);
}

ApplicationDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 *
 * @returns {Array} -
 */
export function useApplication() {
	const state = useContext(Application);
	const actions = useContext(ApplicationDispatch);
	return [state, actions];
}
