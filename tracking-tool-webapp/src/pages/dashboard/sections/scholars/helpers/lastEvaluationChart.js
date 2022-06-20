const skillColors = [
	'var(--primary-color)',
	'var(--success-color)',
	'var(--warning-color)',
	'var(--error-color)',
	'var(--info-color)',
	'var(--icon-primary-color)',
	'var(--text-actual-stage-color)',
	'var(--rating-color)',
];

/**
 * @param {object} listSkills list of all skills objects of a scholar
 * @returns {Array} Array with labels or names of the skills
 */
export function getLabelsForChart(listSkills) {
	const skillNames = listSkills.map((item) => item.name);
	return skillNames;
}

/**
 * @param {object} totalSkills number with the total skills of the scholar
 * @returns {Array} Array with colors codes for every skill
 */
export function getColorsForSkillChart(totalSkills) {
	const colorsForChart = skillColors.slice(0, totalSkills);
	return colorsForChart;
}

/**
 * @param {object} listSkills list of all skills objects of a scholar
 * @returns {Array} Array with scores of every skill but with balanced at 100%
 */
export function getScoresSkillValuesForChart(listSkills) {
	const multiplier = 20;
	const skillsAt100Percent = listSkills.map((item) => item.score * multiplier);
	return skillsAt100Percent;
}

/**
 * @param {object} dataScholarSkills information about the scholar last evaluationSkills
 * @returns {object} object with the information to render the radial bar chart
 */
export function getOptionsPropsForRadialBarChart(dataScholarSkills) {
	const options = {
		labels: getLabelsForChart(dataScholarSkills),
		colors: getColorsForSkillChart(dataScholarSkills.length),
		responsive: [
			{
				breakpoint: 1600,
				options: {
					legend: {
						position: 'bottom',
					},
					chart: {
						height: '500',
					},
					dataLabels: {
						value: {
							fontSize: '0.9rem',
						},
					},
					plotOptions: {
						radialBar: {
							dataLabels: {
								total: {
									fontSize: '1rem',
								},
								value: {
									fontSize: '1rem',
								},
							},
						},
					},
				},
			},
			{
				breakpoint: 1500,
				options: {
					legend: {
						position: 'bottom',
					},
					chart: {
						height: '420',
					},
					plotOptions: {
						radialBar: {
							dataLabels: {
								total: {
									fontSize: '0.8rem',
								},
								value: {
									fontSize: '0.8rem',
								},
							},
						},
					},
				},
			},
			{
				breakpoint: 1000,
				options: {
					legend: {
						show: true,
						position: 'bottom',
					},
					chart: {
						height: '500',
					},
				},
			},
		],
		chart: {
			width: '100%',
		},
		legend: {
			show: true,
			showForSingleSeries: false,
			showForNullSeries: true,
			showForZeroSeries: true,

			horizontalAlign: 'center',
			floating: false,
			fontSize: '14px',
			width: undefined,
			height: undefined,
			formatter: undefined,
			offsetX: 0,
			offsetY: 0,
			labels: {
				colors: undefined,
				useSeriesColors: false,
			},
			markers: {
				width: 12,
				height: 12,
				strokeWidth: 0,
				strokeColor: 'var(--bg-third-color)',
				radius: 12,
				customHTML: undefined,
				onClick: undefined,
				offsetX: 0,
				offsetY: 0,
			},

			onItemClick: {
				toggleDataSeries: true,
			},
			onItemHover: {
				highlightDataSeries: true,
			},
		},
		plotOptions: {
			radialBar: {
				size: undefined,
				inverseOrder: false,
				startAngle: -180,
				endAngle: 180,
				offsetX: 0,
				offsetY: 0,
				hollow: {
					margin: 5,
					size: '50%',
					background: 'transparent',
					image: undefined,
					imageWidth: 150,
					imageHeight: 150,
					imageOffsetX: 0,
					imageOffsetY: 0,
					imageClipped: true,
					position: 'front',
					dropShadow: {
						enabled: false,
						top: 0,
						left: 0,
						blur: 3,
						opacity: 0.5,
					},
				},
				track: {
					show: true,
					startAngle: undefined,
					endAngle: undefined,
					background: 'var(--bg-primary-color)',
					strokeWidth: '97%',
					opacity: 1,
					margin: 5,
					dropShadow: {
						enabled: false,
						top: 0,
						left: 0,
						blur: 3,
						opacity: 0.5,
					},
				},
				dataLabels: {
					show: true,
					value: {
						show: true,
						fontSize: '1rem',
						fontFamily: undefined,
						color: undefined,
						offsetY: 16,
						formatter: function (val) {
							return `${val / 20} / 5`;
						},
					},
					total: {
						show: true,
						label: 'Last Evaluation Scores',
						fontSize: '1rem',
						color: 'var(--text-table-color)',
						formatter: function () {
							return 'Stage - Frontend';
						},
					},
				},
			},
		},
	};

	return options;
}
