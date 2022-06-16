import ConfirmModal from 'components/confirmModal';
import EventFormComponent from '../../components/eventForm';
import { gradesToOptions } from '../../helpers/normalize';
import locale from '../../locale/en.json';
import localeSubject from 'pages/dashboard/components/evaluationManager/locale/en.json';
import { ObjectIsEmpty } from 'helpers/validators';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useApplication } from 'application/context/AppContext';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import '../styles.css';

/**
 * @param {object} props - Properties for MainView.
 * @returns {React.Component} - Jsx Element for Update evaluation Form.
 */
function UpdateForm(props) {
	const { data } = props;
	const [appState, appActions] = useApplication();
	const [state, actions] = useSubjectDetailsContext();
	let {
		share: { eventFormValues },
	} = appState;
	let formProps = {
		grades: gradesToOptions(state.grades),
		errorMessages: localeSubject.errorMessagesSubject,
		eventForm: localeSubject.subjectForm,
		scholar: state.selectedScholar,
	};
	if (!ObjectIsEmpty(state.selectedEvent)) {
		formProps = {
			...formProps,
			...state.selectedEvent,
			eventTypeId: state.selectedScholar.value.subjectEvaluationId,
		};
	} else {
		if (props) {
			formProps = {
				...formProps,
				...props.data,
				eventTypeId: props.data.id,
			};
			eventFormValues = {
				...eventFormValues,
				eventId: props.data.id,
			};
		} else {
			formProps = {
				...formProps,
				eventTypeId: eventFormValues.eventTypeId,
				gradeId: eventFormValues.gradeId,
			};
		}
	}

	useEffect(() => {
		if (!ObjectIsEmpty(state.selectedEvent)) {
			appActions.onShareInformation({
				eventFormValues: {
					eventTypeId: formProps.eventTypeId,
					gradeId: formProps.gradeId,
				},
			});
		}
		actions.onGetGrades();
	}, []);

	const [isOpen, setIsOpen] = useState(false);
	const [putEvaluation, setPutEvaluation] = useState('');
	/**
	 *
	 * @param {Array} informationEvaluation Information about this evaluation
	 */
	function saveEvaluation(informationEvaluation) {
		if (informationEvaluation !== '') {
			const params = { ...informationEvaluation, subjectEvaluationId: data.id };
			actions.onPutEvaluation(params);
			props.displayNewView && appActions.onHideSidebar();
		}
	}

	/**
	 * Cancel update evaluation
	 */
	function onCancel() {
		props.displayNewView ? appActions.onHideSidebar() : actions.onPopView();
		appActions.onShareInformation({ eventFormValues: {} });
	}

	/**
	 * @param {Array} informationEvaluation information about a evaluation
	 */
	function onSubmit(informationEvaluation) {
		setPutEvaluation(informationEvaluation);
		if (informationEvaluation.isPublished) {
			setIsOpen(!isOpen);
		} else {
			saveEvaluation(informationEvaluation);
		}
	}

	/**
	 * @param {Array} informationEvaluation Information about a evaluation
	 */
	function onShare(informationEvaluation) {
		appActions.onShareInformation({
			eventFormValues: { ...eventFormValues, ...informationEvaluation },
		});
	}

	return (
		<>
			<EventFormComponent
				{...formProps}
				onCancel={onCancel}
				onSubmit={onSubmit}
				onShare={onShare}
			></EventFormComponent>
			<ConfirmModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				action={() => {
					saveEvaluation(putEvaluation);
				}}
				content={locale.confirmModalEditEvaluation.content}
				header={locale.confirmModalEditEvaluation.header}
			/>
		</>
	);
}

UpdateForm.propTypes = {
	displayNewView: PropTypes.bool,
	data: PropTypes.object,
};

export default UpdateForm;
