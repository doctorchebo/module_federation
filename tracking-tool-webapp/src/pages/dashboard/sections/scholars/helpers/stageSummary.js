const styleForCard = {
	oldStageColor: '#E9F2FA',
	oldStageLineColor: '#9ECFFB',
	currentStageColor: 'var(--actual-stage-color-bg)',
	currentStageLineColor: 'var(--success-color)',
};

/**
 * Define the Current background for the stage summary card
 *
 * @param {boolean} current Check if the card belongs to a current stage in progress
 * @returns {object} the color string defined for the card
 */
export function defineBackgroundColorForCard(current) {
	const backgroundColor = styleForCard[current ? 'currentStageColor' : 'oldStageColor'];

	return { backgroundColor };
}

/**
 * Define the style timeline in the stage card
 *
 * @param {boolean} current Check if the card belongs to a current stage in progress
 * @returns {object} the color string defined for the card
 */
export function defineTimeLineLineStyleColorForCard(current) {
	const colorDefined = current
		? styleForCard.currentStageLineColor
		: styleForCard.oldStageLineColor;

	return {
		borderLeft: `4px solid ${colorDefined}`,
	};
}

/**
 * Define the style of the circle in the timeline card for the stage summary
 *
 * @param {boolean} current Check if the card belongs to a current stage in progress
 * @returns {object} the styles used for the card
 */
export function defineCircleTimeLineLineStyleColorForCard(current) {
	const colorDefined = current
		? styleForCard.currentStageLineColor
		: styleForCard.oldStageLineColor;

	return {
		position: 'absolute',
		borderRadius: '50%',
		padding: '10px',
		height: '3em',
		width: '3em',
		right: '100%',
		marginRight: '-55px',
		marginTop: '30px',
		backgroundColor: `${colorDefined}`,
	};
}

/**
 * define the style for the score progress bar
 *
 * @param {boolean} current Check if the card belongs to a current stage in progress
 * @param {number} rating Actual Score of the scholar in the stage 1-5
 * @returns {object} the styles used for the card
 */
export function defineProgressBarStyle(current, rating) {
	const colorDefined = current
		? styleForCard.currentStageLineColor
		: styleForCard.oldStageLineColor;

	let style = {
		fontSize: '1rem',
		height: '100%',
		display: 'flex',
		width: `${rating * 20}%`,
		position: 'absolute',
		backgroundColor: `${colorDefined}`,
		justifyContent: 'center',
		alignItems: 'center',
		color: 'var(--bg-first-color)',
	};

	if (rating === 0) {
		style.width = '100%';
	}

	return style;
}

/**
 * define the label for the score progress bar
 *
 * @param {string} current Check if the card belongs to a current stage in progress
 * @param {number} rating Actual Score of the scholar in the stage 1-5
 * @returns {string} the label used for the progress bar
 */
export function defineProgressBarLabel(current, rating) {
	let label = `${rating} / 5`;

	if (rating === 1) {
		label = rating;
	}

	if (rating === 0 && current) {
		label = 'In Progress';
	}

	return label;
}
