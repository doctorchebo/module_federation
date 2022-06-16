/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useProgramVersionDetailsContext } from '../../context/ProgramVersionDetails';
import { useParams } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import './styles.css';
import locale from './locale/en.json';
import { Message } from 'semantic-ui-react';
import CandidatesActivitiesTable from 'pages/dashboard/components/candidates.activities.table';
import { Link } from 'react-router-dom';
import PromoteCandidatesView from './PromoteCandidatesView';
import { Dimmer, Loader } from 'semantic-ui-react';

/**
 * @returns {React.Component} - Component for Program Versions Main View.
 */
function ProgramVersionDetailsView() {
	const [state, actions] = useProgramVersionDetailsContext();
	const { id } = useParams();
	const [checked, setChecked] = useState(false);
	const [promotionMode, setPromotionMode] = useState(true);
	const { activities_not_found, candidates_not_found } = locale.Activities;

	useEffect(() => {
		actions.onLoadProgramVersion(id);
		actions.onLoadActivitiesByProgramVersion(id);
		actions.onLoadCandidatesByProgramVersion(id);
	}, [id]);

	useEffect(() => {
		if (!state.loading) {
			if (state.activities.length > 0) {
				loadCandidatesByActivity();
			}
		}
	}, [state.loading, state.activities]);

	const loadCandidatesByActivity = () => {
		const activities = state.activities;
		const params = {
			postulationId: activities[1]?.id,
			infoTalkId: activities[2]?.id,
		};
		actions.onLoadBoardData(params);
	};

	useEffect(() => {
		if (state.activities.length > 0) {
			loadCandidatesByActivity();
		}
	}, [state.allCandidates]);

	const handleOnLoadCandidatesByActivityId = (item) => {
		const params = {
			activityType: item.activityType.description,
			activityId: item.id,
			status: 'InProgress',
		};
		actions.onLoadCandidatesByActivityId(params);
	};

	const setSimpleDate = (date) => {
		if (date) {
			date = date.split('T')[0];
			let formatDate = new Date(date);
			const month = locale.months[formatDate.getMonth()];
			date = `${month} ${formatDate.getUTCDate()}, ${formatDate.getFullYear()}`;
		}
		return date;
	};
	const initialState = () => {
		actions.onLoadCandidatesByProgramVersion(id);
		const buttonsActivity = Array.from(document.getElementsByClassName('button-activity'));
		buttonsActivity.map((button) => {
			button.style.backgroundColor = '#006277';
		});
		setPromotionMode(true);
		setChecked(false);
	};
	const handleColor = (e) => {
		const buttonsActivity = Array.from(document.getElementsByClassName('button-activity'));
		buttonsActivity.map((button) => {
			button.style.backgroundColor = '#006277';
		});
		e.target.style.background = '#00a0c4';
		setPromotionMode(false);
	};

	const handleToggle = () => {
		const views = Array.from(document.getElementsByClassName('mode-view'));
		views.map((view) => {
			view.classList.add('animate__animated', 'animate__slideInRight');
			view.style.setProperty('--animate-duration', '0.5s');
			view.addEventListener('animationend', () => {
				view.classList.remove('animate__animated');
				view.classList.remove('animate__slideInRight');
			});
		});
		setChecked(!checked);
	};
	const getDisabledStyle = (isDisabled) => ({
		opacity: isDisabled ? '0.4' : '1',
	});
	return (
		<div className='program-version-details'>
			<Dimmer inverted active={state.load}>
				<Loader />
			</Dimmer>
			<div className='header' id='header'>
				<div className='sub-header'>
					<h1 className='title program-title'>
						<Link
							key='path'
							to='/dashboard/program-versions/'
							className='program-title-link'
						>
							{locale.programs}
						</Link>
						<button onClick={initialState}>{state.programVersion.name}</button>
					</h1>
					<div className='title mode'>
						<h3 className='program-title'>
							<Link
								key='path'
								to={`/dashboard/program-versions/${id}/approval-history`}
								className='history-link tooltip'
							>
								<Icon name='file alternate outline'></Icon>
								<span className='tooltiptext'>{locale.approvalHistory}</span>
							</Link>
						</h3>
						<div className='mode tooltip'>
							<p style={getDisabledStyle(promotionMode)}>{locale.promotionMode}</p>
							<input
								type='checkbox'
								value={checked}
								onChange={handleToggle}
								disabled={promotionMode}
								className='cm-toggle color-primary'
								checked={checked}
								style={getDisabledStyle(promotionMode)}
							></input>
							{promotionMode && (
								<span className='program-title tooltiptext'>
									{locale.selectActivity}
								</span>
							)}
						</div>
					</div>
				</div>
				<h3 className='coordinator'>
					<b>{locale.coordinator}:</b> {state.programVersion.coordinator?.firstName}
					{' ' + state.programVersion.coordinator?.lastName}
				</h3>
				<h3 className='duration'>
					<b>{locale.duration}: </b>
					<span className='start-date'>
						{setSimpleDate(state.programVersion.startDate)}
					</span>
					<span className='end-date'>
						<b> to</b> {setSimpleDate(state.programVersion.endDate)}
					</span>
				</h3>
			</div>
			{state.activities.length > 0 ? (
				<div className='scroll' id='button-group-items'>
					{state.activities.slice(1).map((item, index) => (
						<>
							<Button
								key={index}
								onClick={() => {
									handleOnLoadCandidatesByActivityId(item);
								}}
								content={item.activityType.description}
								color='teal'
								size='large'
								className='button-activity'
								onFocus={handleColor}
							/>
						</>
					))}
				</div>
			) : (
				<div className='empty-content'>
					<Message
						className='message-activities'
						content={
							<div className='ui teal message'>
								<h4 className='description'>{activities_not_found}</h4>
							</div>
						}
					/>
				</div>
			)}
			{state.candidates.length > 0 ? (
				checked ? (
					<div className='mode-view'>
						<PromoteCandidatesView
							activities={state.activities}
							infoTalkInProgress={state.infTalkInProgress}
							postulantsInProgress={state.postulantsInProgress}
						/>
					</div>
				) : (
					<div className='mode-view'>
						<CandidatesActivitiesTable value={state.candidates} />
					</div>
				)
			) : (
				<div className='empty-content'>
					<Message
						className='message-activities'
						content={
							<div className='ui teal message'>
								<h4 className='description'>{candidates_not_found}</h4>
							</div>
						}
					/>
				</div>
			)}
		</div>
	);
}

export default ProgramVersionDetailsView;
