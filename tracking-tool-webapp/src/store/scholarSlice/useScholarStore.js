import {
	onGetStageScoreByScholar,
	onGetLastStageEvaluationSkills,
	onCountEvents,
	onGetTrainingsByScholar,
	onLoadStageSummaryOfScholar,
	onScholarUpdate,
	onLoadScholar,
} from './action';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @returns {Function} - useScholarStore
 */
export function useScholarStore() {
	const dispatch = useDispatch();
	const scholar = useSelector((state) => state.scholar);

	const onGetStageScoreByScholarCallback = useCallback(
		(scholarId) => {
			dispatch(onGetStageScoreByScholar(scholarId));
		},
		[dispatch]
	);

	const onGetLastStageEvaluationSkillsCallback = useCallback(
		(scholarId) => {
			dispatch(onGetLastStageEvaluationSkills(scholarId));
		},
		[dispatch]
	);

	const onCountEventsCallback = useCallback(
		(scholarId) => {
			dispatch(onCountEvents(scholarId));
		},
		[dispatch]
	);

	const onGetTrainingsByScholarCallback = useCallback(
		(scholar) => {
			dispatch(onGetTrainingsByScholar(scholar));
		},
		[dispatch]
	);

	const onLoadStageSummaryOfScholarCallback = useCallback(
		(scholar) => {
			dispatch(onLoadStageSummaryOfScholar(scholar));
		},
		[dispatch]
	);

	const onScholarUpdateCallback = useCallback(
		(scholarId) => {
			dispatch(onScholarUpdate(scholarId));
		},
		[dispatch]
	);

	const onLoadScholarCallback = useCallback(
		(scholarId) => {
			dispatch(onLoadScholar(scholarId));
		},
		[dispatch]
	);

	return {
		scholar,
		onGetStageScoreByScholar: onGetStageScoreByScholarCallback,
		onGetLastStageEvaluationSkills: onGetLastStageEvaluationSkillsCallback,
		onCountEvents: onCountEventsCallback,
		onGetTrainingsByScholar: onGetTrainingsByScholarCallback,
		onLoadStageSummaryOfScholar: onLoadStageSummaryOfScholarCallback,
		onScholarUpdate: onScholarUpdateCallback,
		onLoadScholar: onLoadScholarCallback,
	};
}
