import React, { useEffect } from 'react';
import { useEvaluationContext } from '../../context/evaluation';
import EvaluationForm from '../../components/evaluationForm';
import ScholarInformation from 'pages/dashboard/components/scholar.information';
import ScholarsEvaluationTop from '../../../../components/scholars.evaluation.top';
import EventManager from 'pages/dashboard/components/eventsManager';
import { useParams } from 'react-router';
import { Tab, Menu, Segment, Image } from 'semantic-ui-react';
import './styles.css';
import ApprovalList from '../../../../components/approval.list';
import { useApplication } from 'application/context/AppContext';
import EvaluationTopBar from '../../../../components/scholars.evaluation.topbar';
import { validateCloseEvaluationRolesBool } from '../../helpers/validation';
import EmptyContent from 'assets/img/empty-list.png';
import locale from '../../locale/en.json';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} - Component for Scholars Page.
 */
function EvaluationView() {
	const [state, actions] = useEvaluationContext();
	const [appState] = useApplication();
	const { id } = useParams();

	useEffect(() => {
		actions.onLoadScholarId(id);
		actions.onLoad(id);
	}, [state.scholarId]);

	useEffect(() => {
		if (state.evaluation) {
			actions.onLoadApprovals(state.evaluation.evaluationId);
		}
	}, [state.evaluation]);

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.scholarEvaluationsStage);
	}, []);

	/**
	 * Handle onClick Check an Approval
	 *
	 * @param {object} approval item clicked
	 */
	function onCheckApproval(approval) {
		const resource = {
			approval,
			currentUserId: appState.profile.id,
			evaluationVersion: state.evaluation.currentVersion,
		};
		actions.onCheckApproval(resource);
	}

	/**
	 * handle onClick finish evaluation
	 *
	 */
	function handleOnFinishEvaluation() {
		actions.onCloseEvaluation({
			currentUser: appState.profile.role,
			approvals: state.approvals,
			evaluationId: state.evaluation.evaluationId,
		});
	}

	/**
	 * Handle onClick Reload button
	 *
	 */
	function handleOnReload() {
		actions.onChangeStage(state);
	}

	return (
		<div className='evaluation'>
			<Segment loading={state.loading} className='evaluation-main'>
				{state.scholar && <ScholarInformation {...state.scholar?.person} />}
				<ScholarsEvaluationTop
					stageId={state.stageId}
					stages={state.stages || []}
					onChange={(val) => {
						actions.onChangeStage({
							scholarId: state.scholarId,
							stageId: val,
							stage: state.stages.filter((stage) => stage.id === val),
						});
					}}
				/>

				{state.evaluation ? (
					<>
						<EvaluationTopBar
							value={{
								name: state.currentStage?.name,
								version: `v${state.evaluation?.currentVersion}`,
								...locale.evaluation,
							}}
							onFinish={handleOnFinishEvaluation}
							onReload={handleOnReload}
							readOnly={state.evaluation?.mode === 'ReadOnly'}
							isClosed={state.evaluation?.isClosed}
							showFinishButton={
								validateCloseEvaluationRolesBool(appState.profile.role) &&
								!state.evaluation?.isClosed
							}
						/>
						<EvaluationForm
							initState={state.evaluation}
							onSubmit={actions.onSaveEvaluation}
							readOnly={false}
						/>
						<br />
						<ApprovalList
							value={state.approvals || []}
							loading={state.loading}
							handleOnClickItem={onCheckApproval}
							showMessage={state.approvalsError}
							setShowMessage={actions.onSetApprovalsError}
						/>
					</>
				) : (
					<div className={'empty-content'}>
						<Image disabled src={EmptyContent} />
					</div>
				)}
			</Segment>
			<div className='evaluation-event'>
				<Tab
					menu={{ secondary: true, pointing: true }}
					panes={[
						{
							menuItem: (
								<Menu.Item key='messages' className={'menu-tab'}>
									Events
								</Menu.Item>
							),
						},
					]}
				/>
				{state.scholar ? (
					<EventManager user={{ ...state.scholar, id: state.scholarId }} />
				) : null}
			</div>
		</div>
	);
}

export default EvaluationView;
