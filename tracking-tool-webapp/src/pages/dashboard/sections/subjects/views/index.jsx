import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Image } from 'semantic-ui-react';
import { useSubjectDetailsContext } from '../context/subjectDetailsContext';
import { useApplication } from 'application/context/AppContext';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import Button from 'components/button';
import Icon from 'components/icon';
import SubjectScholarsTable from 'pages/dashboard/components/subject.scholars.table';
import EmptyContent from 'assets/img/empty-list.png';
import locale from 'pages/dashboard/locale/en.json';

/**
 * @returns {React.Component} - Component for Subjects Page.
 */
export default function MainView() {
	const [state, actions] = useSubjectDetailsContext();

	const { actualSubject } = state;
	const { id } = useParams();

	const [, appActions] = useApplication();

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.subjects);
	}, []);

	useEffect(() => {
		actions.onGetScholarEvaluationsBySubjectId(id);
	}, [id]);

	if (state.loading || !state.actualSubject) {
		return (
			<div className='personal-container'>
				<div className={'section-header'}>
					<div className={'title'}>Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className='personal-container'>
			<div className={'section-header'}>
				<div
					className={'title'}
				>{`${actualSubject.programVersionName} - ${actualSubject.subjectName}`}</div>
				{state.scholars.length ? (
					<Button
						basic
						as={Link}
						content={locale.bulkEvaluationButton}
						icon={<Icon name={'pencil-alt'} />}
						className='button'
						to={`/dashboard/subjects/${id}/evaluation`}
					/>
				) : (
					''
				)}
			</div>
			{state.scholars.length ? (
				<SubjectScholarsTable
					value={state.scholars}
					subjectId={id}
					onSendReports={actions.OnSendEvaluationReports}
					onSidebarOpen={appActions.onSidebarAddView}
				/>
			) : (
				<div className={'empty-content'}>
					<Image disabled src={EmptyContent} />
				</div>
			)}
		</div>
	);
}
