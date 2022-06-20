import React, { useEffect } from 'react';
import './style.css';
import StageItem from '../stageItem';
import { PropTypes } from 'prop-types';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';

/**
 * @param {object} props This object contains all the info of the componet
 * @param {object} props.params This object contain the params for the request
 * @param {object} props.isOpen This object contain the logic for open the component
 * @returns {React.Component} - Stage Performance Container
 */
export default function StagePerformance({ params, isOpen }) {
	const [state, actions] = useScholarDetailContext();

	useEffect(() => {
		if (isOpen) {
			handleOnLoadStagesSummary(params);
		}
	}, [isOpen]);

	/**
	 * load the stages summary of the Scholar
	 */
	function handleOnLoadStagesSummary() {
		actions.onLoadStageSummaryOfScholar(params);
	}

	if (!isOpen || !state.stageSummary) {
		return null;
	}

	return (
		state.stageSummary !== undefined && (
			<tr className='container-stage'>
				<td
					colSpan={5}
					style={{
						paddingRight: '0px',
					}}
				>
					<div className='program'>
						{state.stageSummary.length <= 0 ? (
							<h2>There Is No Stages Yet.</h2>
						) : (
							state.stageSummary.map((item, key) => {
								let isTheCurrent = false;

								if (key === state.stageSummary.length - 1) {
									isTheCurrent = true;
								}

								return (
									<StageItem
										key={item.stageId}
										data={item}
										isTheCurrent={isTheCurrent}
									/>
								);
							})
						)}
					</div>
				</td>
			</tr>
		)
	);
}

StagePerformance.propTypes = {
	programName: PropTypes.string,
	profileData: PropTypes.object,
	params: PropTypes.object,
	isOpen: PropTypes.bool,
};
