import React, { useEffect } from 'react';
import './styles.css';
import EvaluationChart from './chart';
import {
	getOptionsPropsForRadialBarChart,
	getScoresSkillValuesForChart,
} from 'pages/dashboard/sections/scholars/helpers/lastEvaluationChart';
import { useParams } from 'react-router';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';

/**
 * @returns {React.Component} -
 */
export default function CardSummary() {
	const [state, actions] = useScholarDetailContext();
	const { programVersionId } = state.data;
	const { id } = useParams();
	const params = {
		scholarId: id,
		programVersionId,
	};

	useEffect(() => {
		actions.OnGetLastStageEvaluationSkills(params);
	}, []);

	let series;
	let options;

	if (state.errorLastEvaluationSummary) {
		return <div className='error-message-container'></div>;
	}

	if (state.loadingLastEvaluationSummary) {
		return <h1>Loading...</h1>;
	} else {
		const scores = state.lastEvaluationSummary.skills;
		series = getScoresSkillValuesForChart(scores);
		options = getOptionsPropsForRadialBarChart(scores);
	}

	return (
		<div className='chart-evaluations-container'>
			<EvaluationChart options={options} series={series} type='radialBar' />
		</div>
	);
}
