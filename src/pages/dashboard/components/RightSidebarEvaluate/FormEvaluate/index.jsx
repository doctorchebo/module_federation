import ConfirmModal from 'components/confirmModal';
import EmptyContent from 'assets/img/empty-list.png';
import { Image } from 'semantic-ui-react';
import localeSubject from 'pages/dashboard/sections/subjects/locale/en.json';
import React, { useEffect, useState } from 'react';
import SubjectEvaluationForm from '../subject.evaluation.form';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import { useApplication } from 'application/context/AppContext';
import '../styles.css';

/**
 * Renders the content of RightSidebar when works with eveluation
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvaluate content
 */
export default function FormEvaluate(properties) {
	const { item, subjectId } = properties;
	const [, appActions] = useApplication();
	const [state, actions] = useSubjectDetailsContext();
	const [isOpen, setIsOpen] = useState(false);
	const [postEvaluation, setPostEvaluation] = useState('');
	let currentComment = item.lastComment;
	let currentGrade = item.grade;
	if (!currentComment) {
		currentComment =
			'<ul><li><span style="color: rgba(0,0,0,0.9);' +
			'background-color: rgb(255,255,255);font-size: 14px;">' +
			'Strengths.</span></li><li><span style="color:' +
			'rgba(0,0,0,0.9);background-color: rgb(255,255,255);' +
			'font-size: 14px;">To improve.</span></li><li>' +
			'<span style="color: rgba(0,0,0,0.9);background-color:' +
			'rgb(255,255,255);font-size: 14px;">Would you like to ' +
			'work with him/her?</span>&nbsp;</li></ul>';
	}

	useEffect(() => {
		actions.onGetGrades();
	}, []);

	const getIdGrade = (textGrade, allGrade) => {
		if (textGrade) {
			return allGrade.find((grade) => grade.text === textGrade).key;
		}
		return '';
	};

	const saveData = (value) => {
		setTimeout(() => {
			const payload = {
				scholarId: item.id,
				subjectId: subjectId,
				...value,
			};
			actions.onPostEvaluate(payload);
			closeModal();
		}, 200);
	};

	const closeModal = () => {
		appActions.onHideSidebar();
	};

	const onSubmitForm = (value) => {
		setPostEvaluation(value);
		if (value.isPublished) {
			setIsOpen(true);
		} else {
			saveData(value);
		}
	};

	return (
		<>
			<div className='container-form-evaluate'>
				{state.grades.length > 0 ? (
					<>
						<SubjectEvaluationForm
							value={{
								comment: currentComment,
								grade: getIdGrade(currentGrade, state.grades),
							}}
							isPublished={false}
							eventTypes={state.grades}
							eventForm={localeSubject.subjectForm}
							errorMessages={localeSubject.errorMessagesSubject}
							onSubmit={onSubmitForm}
							onCancel={() => {
								closeModal();
							}}
						/>
						<ConfirmModal
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							action={() => {
								saveData(postEvaluation);
							}}
							content={localeSubject.confirmModalPostEvaluation.content}
							header={localeSubject.confirmModalPostEvaluation.header}
						/>
					</>
				) : (
					<div className={'empty-content'}>
						<Image disabled src={EmptyContent} />
					</div>
				)}
			</div>
		</>
	);
}
