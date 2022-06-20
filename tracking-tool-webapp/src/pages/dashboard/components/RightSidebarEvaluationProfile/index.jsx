import React, { useEffect } from 'react';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import { useEvaluationContext } from 'pages/dashboard/sections/scholars/context/evaluation';
import EvaluationForm from 'pages/dashboard/sections/scholars/components/evaluationForm';
import ApprovalList from 'pages/dashboard/components/approval.list';
import EmptyContent from 'assets/img/empty-list.png';
import { Image, Segment } from 'semantic-ui-react';
import './styles.css';

/**
 * Renders the content of RightSidebar when works with eveluation
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvaluationProfile content
 */
export default function RightSidebarEvaluationProfile(properties) {
	const [state, actions] = useEvaluationContext();
	const { item } = properties;

	useEffect(() => {
		actions.onChangeStage({
			scholarId: item.scholarId,
			stageId: item.stageId,
		});
	}, []);

	useEffect(() => {
		if (state.evaluation) {
			actions.onLoadApprovals(state.evaluation.evaluationId);
		}
	}, [state.evaluation]);

	return (
		<>
			<ScholarSideBarHeader user={item?.stageName} title='Evaluations'></ScholarSideBarHeader>
			<Segment loading={state.loading} className='evaluation-main'>
				{state.evaluation ? (
					<div className='wrapper-evaluations'>
						<EvaluationForm
							initState={state.evaluation}
							onSubmit={actions.onSaveEvaluation}
							readOnly={true}
						/>
						<ApprovalList
							value={state.approvals || []}
							loading={state.loading}
							showMessage={state.approvalsError}
							setShowMessage={actions.onSetApprovalsError}
						/>
					</div>
				) : (
					<div className={'empty-content '}>
						<Image disabled src={EmptyContent} />
					</div>
				)}
			</Segment>
		</>
	);
}
