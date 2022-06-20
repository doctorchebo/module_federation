import React from 'react';
import './style.css';
import { PropTypes } from 'prop-types';
import {
	defineBackgroundColorForCard,
	defineTimeLineLineStyleColorForCard,
	defineCircleTimeLineLineStyleColorForCard,
	defineProgressBarStyle,
	defineProgressBarLabel,
} from 'pages/dashboard/sections/scholars/helpers/stageSummary';
import ActionsMenu from 'components/actionsMenu';
import locale from 'pages/dashboard/locale/en.json';
import RightSidebarEvaluationProfile from 'pages/dashboard/components/RightSidebarEvaluationProfile';
import { useApplication } from 'application/context/AppContext';
import { EvaluationContextProvider } from 'pages/dashboard/sections/scholars/context/evaluation';

/**
 * @param {object} props This object contain actions to execute sections/scholars/context/evaluation
 * @returns {React.Component} - Stage Item Container
 */
export default function StageItem(props) {
	const { data, isTheCurrent: isCurrent } = props;
	const [, appActions] = useApplication();

	const setListAction = (item) => {
		return [
			{
				text: locale.actionStage.Details,
				onClick: () => {
					appActions.onSidebarAddView({
						header: null,
						content: (
							<EvaluationContextProvider>
								<RightSidebarEvaluationProfile item={item} />
							</EvaluationContextProvider>
						),
						footer: null,
						onHide: () => {
							appActions.onHideSidebar();
							appActions.onShareInformation({ eventFormValues: {} });
						},
					});
				},
			},
		];
	};

	return (
		<div
			className='stage-item-container'
			style={defineTimeLineLineStyleColorForCard(isCurrent)}
		>
			<div className='content'>
				<div className='first-content' style={defineBackgroundColorForCard(isCurrent)}>
					<div className='title'>
						<h3>Stage - {data.stageName}</h3>
					</div>
					<div className='score'>
						<p className='title-score'>Rating Score:</p>
						<div className='score-item'>
							<span style={defineProgressBarStyle(isCurrent, data.overallRating)}>
								{defineProgressBarLabel(isCurrent, data.overallRating)}
							</span>
						</div>
					</div>
				</div>
				<div className='second-content'>
					<div className='recommendations'>
						<p className='title-recommendation'>Recommendations</p>
						<div className='recommendation-field'>
							<p>{data.generalComments}</p>
						</div>
					</div>
					<div className='recommendations'>
						<p className='title-recommendation'>Goals</p>
						<div className='recommendation-field'>
							<p>{data.goals}</p>
						</div>
					</div>
					<div className='btn-more-action'>
						<ActionsMenu itemList={setListAction(data)} />
					</div>
				</div>
			</div>
			<div style={defineCircleTimeLineLineStyleColorForCard(isCurrent)}></div>
		</div>
	);
}

StageItem.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
	isTheCurrent: PropTypes.bool,
};
