import {
	getLabelsForChart,
	getColorsForSkillChart,
	getScoresSkillValuesForChart,
	getOptionsPropsForRadialBarChart,
} from '../lastEvaluationChart';

const scores = [
	{
		name: 'Communication / Listening Skills',
		score: 2,
	},
	{
		name: 'Job Knowledge',
		score: 3,
	},
	{
		name: 'Responsibility / Commitment',
		score: 4,
	},
	{
		name: 'Time Management',
		score: 1,
	},
	{
		name: 'Work Quality',
		score: 3,
	},
	{
		name: 'Initiative / Proactivity',
		score: 2,
	},
	{
		name: 'Attendance / Punctuality',
		score: 1,
	},
	{
		name: 'Self - Sufficiency',
		score: 3,
	},
];

const dataLength = scores.length;

describe('helpers/lastEvaluationChart', () => {
	test('Should return the labels or names of the skills', () => {
		const skillNames = getLabelsForChart(scores);
		expect(skillNames).toHaveLength(dataLength);
		expect(skillNames[0]).toBe(scores[0].name);
	});
	test('Should return the color for the number of skills specified', () => {
		const skillColors = getColorsForSkillChart(dataLength);
		expect(skillColors).toHaveLength(dataLength);
		expect(skillColors[0]).toBe('var(--primary-color)');
	});
	test('Should return the scores updated at 100% for every skill', () => {
		const skillScoreExpected = scores[0].score * 20;
		const skillScoresAt100 = getScoresSkillValuesForChart(scores);
		expect(skillScoresAt100).toHaveLength(8);
		expect(skillScoresAt100[0]).toBe(skillScoreExpected);
	});
	test('Should return the options object for the chart', () => {
		const chartOptions = getOptionsPropsForRadialBarChart(scores);
		expect(chartOptions).toHaveProperty('labels');
		expect(chartOptions).toHaveProperty('colors');
		expect(chartOptions).toHaveProperty('legend');
		expect(chartOptions).toHaveProperty('plotOptions');
	});
});
