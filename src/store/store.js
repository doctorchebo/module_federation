import { legacy_createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

/**
 *
 * @param {object} initialState - The initial state of the store.
 * @returns {object} - The store.
 */
export default function configureStore(initialState) {
	const middlewares = [thunk, reduxImmutableStateInvariant()];
	const enhancers = [applyMiddleware(...middlewares)];

	/* eslint no-underscore-dangle: 0 */
	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: compose;

	const store = legacy_createStore(rootReducer, initialState, composeEnhancers(...enhancers));

	return store;
}
