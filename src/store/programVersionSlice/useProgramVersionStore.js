import { onSendSubjectEvaluationReports } from './action';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @returns {Function} - useScholarStore
 */
export function useProgramVersionStore() {
	const dispatch = useDispatch();
	const scholar = useSelector((state) => state.scholar);

	const onSendSubjectEvaluationReportsCallback = useCallback(
		(scholarId) => {
			dispatch(onSendSubjectEvaluationReports(scholarId));
		},
		[dispatch]
	);

	return {
		scholar,
		onSendSubjectEvaluationReports: onSendSubjectEvaluationReportsCallback,
	};
}
