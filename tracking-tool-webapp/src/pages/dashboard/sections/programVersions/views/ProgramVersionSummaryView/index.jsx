import React, { useEffect, useState } from 'react';
import { Grid, Loader, Button, Image } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useEvaluationSummaryContext } from '../../context/evaluationSummary';
import ScholarCard from 'pages/dashboard/components/scholar.card';
import MenuDropdown from 'components/menu';
import ConfirmModal from 'components/confirmModal';
import locale from '../../locale/en.json';
import { imageUsersMissing } from 'helpers/Dashboard';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './styles.css';

/**
 * @returns {React.Component} - Component for Program Evaluation Summary View.
 */
function EvaluationSummaryView() {
	const [state, actions] = useEvaluationSummaryContext();
	const { id } = useParams();
	const [options, setOptions] = useState();
	const [, setFilterOption] = useState();
	const [filterValueSelected, setFilterValueSelected] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const { Pending, Approved, Failed, Empty } = locale.EvaluationColumns;
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.programsEvaluation);
	}, []);
	/**
	 * generates the stages options to send to the filter
	 */
	function generateOptions() {
		const currentRoles = state.stages.map((stage) => ({
			text: stage.name,
			value: stage.id,
		}));
		setOptions([{ name: `Select ${locale.stage}`, list: currentRoles }]);
	}

	/**
	 * it going to filter by selected value
	 *
	 * @param {string} value - filter value
	 */
	function filter(value) {
		const filter = {
			programVersionId: id,
			stageId: value,
		};
		actions.onLoadScholars(filter);
	}

	const handleOnClickButton = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		if (state.stages.length > 0) {
			generateOptions();
		}
	}, [state.stages]);

	useEffect(() => {
		if (options) {
			const stagesLength = state.stages.length;
			let lastStage = state.stages[stagesLength - 1];
			filter(lastStage.id);
			setFilterValueSelected(`${locale.selectStage}: ${lastStage.name}`);
		}
	}, [options]);

	useEffect(() => {
		actions.onLoadProgramVersion(id);
		actions.onGetStages(id);
	}, []);

	/**
	 *
	 * @param {string} id Scholar id
	 * @returns {string} return the URL to the scholar evaluation
	 */
	function getScholarEvaluationUrl(id) {
		return `/dashboard/scholars/${id}/evaluation`;
	}

	return (
		<div className='evaluation-summary'>
			<div className={'section-header'}>
				<div className={'title'}>{state.programVersion.name}</div>
			</div>
			{state.sendEvaluation ? (
				<Button
					className='evaluation-button'
					icon='mail'
					content={locale.actionMenu.evaluationReport}
					onClick={handleOnClickButton}
				/>
			) : (
				<div></div>
			)}
			<MenuDropdown
				placeholder={filterValueSelected}
				options={options}
				selectFilter={setFilterOption}
				selectFilterValue={filter}
			></MenuDropdown>

			{state.loading ? (
				<Loader className='loading' active={true} size={'huge'}>
					{locale.loading}
				</Loader>
			) : (
				<>
					<Grid className='evaluation-columns' columns='three'>
						<Grid.Row textAlign='center'>
							<Grid.Column>
								<div>{Pending}</div>

								{state.pendingScholars.length > 0 ? (
									state.pendingScholars.map((scholar, index) => (
										<ScholarCard
											key={index}
											value={{
												...scholar,
												evaluationUrl: getScholarEvaluationUrl(scholar.id),
											}}
										/>
									))
								) : (
									<div className={'empty-content'}>
										<Image spaced size='medium' src={imageUsersMissing} />
										<div>{Empty}</div>
									</div>
								)}
							</Grid.Column>
							<Grid.Column>
								<div>{Approved}</div>

								{state.approvedScholars.length > 0 ? (
									state.approvedScholars.map((scholar, index) => (
										<ScholarCard
											key={index}
											value={{
												...scholar,
												evaluationUrl: getScholarEvaluationUrl(scholar.id),
											}}
										/>
									))
								) : (
									<div className={'empty-content'}>
										<Image spaced size='medium' src={imageUsersMissing} />
										<div>{Empty}</div>
									</div>
								)}
							</Grid.Column>
							<Grid.Column>
								<div>{Failed}</div>

								{state.failedScholars.length > 0 ? (
									state.failedScholars.map((scholar, index) => (
										<ScholarCard
											key={index}
											value={{
												...scholar,
												evaluationUrl: getScholarEvaluationUrl(scholar.id),
											}}
										/>
									))
								) : (
									<div className={'empty-content'}>
										<Image spaced size='medium' src={imageUsersMissing} />
										<div>{Empty}</div>
									</div>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</>
			)}
			<ConfirmModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				action={() => actions.OnSendEvaluationReports(id)}
				content={`${locale.confirmModal.content}`}
				header={locale.confirmModal.header}
			/>
		</div>
	);
}

export default EvaluationSummaryView;
