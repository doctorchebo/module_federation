import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { onLoadGrades, onUpdateGrades } from './action';

/**
 * @returns {Function} - useScholarStore
 */
export function useSettingsStore() {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);

	const onLoadGradesCallback = useCallback(() => {
		dispatch(onLoadGrades());
	}, [dispatch]);

	const onUpdateGradesCallback = useCallback(
		(payload) => {
			dispatch(onUpdateGrades(payload));
		},
		[dispatch]
	);

	return {
		settings,
		onLoadGrades: onLoadGradesCallback,
		onUpdateGrades: onUpdateGradesCallback,
	};
}
