import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import ConfirmModal from 'components/confirmModal';
import PaginationComponent from 'components/Pagination';
import { Image, Segment } from 'semantic-ui-react';
import EmptyContent from 'assets/img/empty-list.png';
import { Card } from 'semantic-ui-react';
import Icons from 'components/icon';
import RichTextShowMore from 'components/richTextShowMore';
import locale from 'pages/dashboard/locale/en.json';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import FormEvaluate from 'pages/dashboard/components/RightSidebarEvaluate/FormEvaluate';
import '../styles.css';
/**
 * @param {object} props - component properties
 * @param {object} props.user - user object
 * @param {object} props.event - event object
 * @param {object} props.displayNewView - boolean
 * @returns {React.Component} - view component for list of cards.
 */
function EvaluationHistoryCardListView(props) {
	const { data, onAction } = props;
	const [state, actions] = useSubjectDetailsContext();
	const [isOpen, setIsOpen] = useState(false);
	const [evaluationToDelete, setEvaluationToDelete] = useState('');
	const { content, header } = locale.confirmModal;

	const DATE_SETTINGS = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};
	const params = {
		scholarId: data.id,
		subjectId: data.subjectId,
	};

	const { tooltip } = locale;
	const { edit, deleted } = tooltip;

	/**
	 *
	 * @param {number} pageNumber - property page number
	 */
	function handleOnFilterChanged(pageNumber) {
		actions.onLoadEvaluationHistory({
			scholarId: params.scholarId,
			subjectId: params.subjectId,
			pageNumber: pageNumber,
		});
	}

	useEffect(() => {
		actions.onLoadEvaluationHistory({
			scholarId: params.scholarId,
			subjectId: params.subjectId,
			pageNumber: state.pagination.currentPage,
		});
	}, []);

	const confirmDeletion = (idEvaluation) => {
		setIsOpen(!isOpen);
		setEvaluationToDelete(idEvaluation);
	};

	const deleteEvaluation = async () => {
		await actions.onDeleteEvaluation(evaluationToDelete);
		await actions.onLoadEvaluationHistory({
			scholarId: params.scholarId,
			subjectId: params.subjectId,
			pageNumber: state.pagination.currentPage,
		});
	};

	const isPublished = (status) => {
		return status.isPublished !== 'True' ? true : false;
	};

	return (
		<div>
			<Segment loading={state.loadingEvaluateHistory} className='evaluation-main'>
				<div className='container-form-evaluate'>
					<div className='event-list'>
						<Button
							key='add-event-btn'
							className='add-event-btn u-margin-0'
							onClick={() => {
								actions.onAddView(
									<FormEvaluate item={data} subjectId={data.subjectId} />
								);
							}}
						>
							Add Evaluation
							<Icon name='add' />
						</Button>
					</div>

					{state.evaluationHistory.length ? (
						<div>
							{state.evaluationHistory.map((item) => (
								<div className='card-event' key={item.id}>
									<Card name='card-container'>
										<Card.Content>
											<Card.Header
												className='card-icon'
												textAlign='left'
												name='card-header'
											>
												<div className='container-grade'>
													{item.gradeName}
												</div>
												<div className='content-icon'>
													<Icons
														className={`icon ${
															isPublished(item)
																? 'active-icon'
																: 'disable-icon'
														}`}
														name={'pencil-alt'}
														tooltipText={edit}
														onClick={() => {
															isPublished(item) && onAction(item);
															return item;
														}}
													/>
													<Icons
														className={`icon u-padding-5 ${
															isPublished(item)
																? 'active-icon'
																: 'disable-icon'
														}`}
														name={'trash'}
														tooltipText={deleted}
														onClick={() => {
															isPublished(item) &&
																confirmDeletion(item.id);
														}}
													/>
												</div>
											</Card.Header>
											<Card.Description name='card-description'>
												<RichTextShowMore description={item.comment} />
											</Card.Description>
											<Card.Content extra>
												<div className='container-footer'>
													<span>
														{new Date(
															item.evaluationDate
														).toLocaleString([], DATE_SETTINGS)}
													</span>
												</div>
											</Card.Content>
										</Card.Content>
									</Card>
								</div>
							))}
							<div className='footer-pagination'>
								<PaginationComponent
									currentPage={state.pagination.currentPage}
									totalPages={state.pagination.totalPages}
									pageSize={state.pagination.pageSize}
									totalResults={state.pagination.totalCount}
									onPageChanged={handleOnFilterChanged}
								/>
							</div>
						</div>
					) : (
						<div className={'empty-content '}>
							<Image disabled src={EmptyContent} />
						</div>
					)}
				</div>
			</Segment>
			<ConfirmModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				action={deleteEvaluation}
				content={content}
				header={header}
			/>
		</div>
	);
}

EvaluationHistoryCardListView.propTypes = {
	user: PropTypes.object,
	data: PropTypes.object,
	event: PropTypes.object,
	showFormEvent: PropTypes.bool,
	displayNewView: PropTypes.bool,
	onAction: PropTypes.func,
};

export default EvaluationHistoryCardListView;
