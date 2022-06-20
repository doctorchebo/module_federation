import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ActivityBoard from 'pages/dashboard/components/activity.board';
import { DragDropContext } from 'react-beautiful-dnd';
import { Divider, Button } from 'semantic-ui-react';
import './index.css';
import {
	dataBuilder,
	checkChangesInCandidates,
	mapCandidatesActivitiesToCandidate,
} from '../../../helpers/mappers/mapCandidatesActivitiesToTable';
import { mapPromotedCandidates } from '../../../helpers/mapOptionsForFilter';
import { useProgramVersionDetailsContext } from '../../../context/ProgramVersionDetails';

/**
 * @param {object} props -props
 * @param {Array} props.activities - activities to be shown
 * @param {Array} props.infoTalkInProgress - candidates with state inProgress within infoTalk
 * @param {Array} props.postulantsInProgress - candidates with state inProgress within postulation
 * @returns {React.Component} - Base Page
 */
const PromoteCandidatesView = ({ activities, infoTalkInProgress, postulantsInProgress }) => {
	const [context, actions] = useProgramVersionDetailsContext();
	const data = JSON.parse(
		JSON.stringify(
			dataBuilder(
				activities,
				mapCandidatesActivitiesToCandidate(postulantsInProgress),
				mapCandidatesActivitiesToCandidate(infoTalkInProgress)
			)
		)
	);
	const [initialData, setInitialData] = useState(JSON.parse(JSON.stringify(data)));
	const [state, setState] = useState(data);
	const [disabledButton, setDisabledButton] = useState(true);

	useEffect(() => {
		if (checkChangesInCandidates(initialData, state)) {
			setDisabledButton(true);
		} else {
			setDisabledButton(false);
		}
	}, [state, initialData]);
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	/**
	 * @param {object} source source
	 * @param {object} destination destination
	 * @param {object} droppableSource droppableSource
	 * @param {object} droppableDestination droppableDestination
	 * @returns {object} result
	 */
	const move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source);
		const destClone = Array.from(destination);
		const [removed] = sourceClone.splice(droppableSource.index, 1);

		destClone.splice(droppableDestination.index, 0, removed);

		const result = {};
		result[droppableSource.droppableId] = sourceClone;
		result[droppableDestination.droppableId] = destClone;

		return result;
	};

	const onHandleUpdateCandidates = () => {
		const data = state['2'];
		const activityId = data.id;
		const candidates = mapPromotedCandidates(data.candidates, activityId);
		const activities = context.activities;
		const params = {
			postulationId: activities[1].id,
			infoTalkId: activities[2].id,
			candidates: candidates,
		};
		actions.onLoadPromoteCandidatesBetweenActivities(params);
		setInitialData(JSON.parse(JSON.stringify(state)));
	};
	const handleCancelUpdateCandidates = () => {
		setState(JSON.parse(JSON.stringify(data)));
	};
	/**
	 * @param {object} result result
	 */
	function onDragEnd(result) {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		const sInd = { ...source }.droppableId;
		const dInd = { ...destination }.droppableId;

		if (sInd === dInd) {
			const items = reorder(state[sInd].candidates, source.index, destination.index);
			const newState = { ...state };
			newState[sInd].candidates = items;
			setState(newState);
		} else {
			const sourceArray = [...state[sInd].candidates];
			const destinationArray = [...state[dInd].candidates];
			const result = move(sourceArray, destinationArray, source, destination);
			const newState = { ...state };
			newState[sInd].candidates = result[sInd];
			newState[dInd].candidates = result[dInd];
			setState(newState);
		}
	}
	return (
		<div className='root'>
			<Divider />
			<div style={{ display: 'flex' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					{Object.keys(state).map((ind) => (
						<ActivityBoard key={ind} list={state[ind]} index={ind} />
					))}
				</DragDropContext>
			</div>
			<div className='buttons-promotion-mode' id='buttons-promotion-mode'>
				<Button onClick={handleCancelUpdateCandidates} disabled={disabledButton}>
					Cancel
				</Button>
				<Button onClick={onHandleUpdateCandidates} disabled={disabledButton}>
					Save
				</Button>
			</div>
		</div>
	);
};

PromoteCandidatesView.propTypes = {
	activities: PropTypes.array,
	infoTalkInProgress: PropTypes.array,
	postulantsInProgress: PropTypes.array,
};

export default PromoteCandidatesView;
