import React from 'react';
import { PropTypes } from 'prop-types';
import Chart from 'react-apexcharts';

/**
 * @param {object} props - Contains all the data passed from a parent component
 * @param {object} props.options - Contains all the needed to render the chart
 * @param {object} props.series - Contains the scores of every score received
 * @returns {React.Component} -
 */
export default function EvaluationChart({ options, series }) {
	return <Chart options={options} series={series} type='radialBar' height={350} />;
}

EvaluationChart.propTypes = {
	options: PropTypes.object,
	series: PropTypes.array,
};
