import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Profile from 'pages/profile';
import Users from './sections/users';
import Scholars from './sections/scholars';
import Candidates from './sections/candidates';
import SubjectEvaluation from './sections/subjectEvaluation';
import Interns from './sections/interns';
import Roles from './sections/roles';
import ProgramVersions from './sections/programVersions';
import ProgramVersionDetailsView from './sections/programVersions/views/ProgramVersionDetailsView';
import EvaluationSummaryView from './sections/programVersions/views/ProgramVersionSummaryView';
import HomeView from './views/home';
import EvaluationView from './sections/scholars/views/EvaluationView';
import DetailsView from './sections/scholars/views/DetailsView';
import { EvaluationContextProvider } from './sections/scholars/context/evaluation';
// eslint-disable-next-line max-len
import { ProgramVersionDetailsContextProvider } from './sections/programVersions/context/ProgramVersionDetails';
import { EvaluationSummaryContextProvider } from './sections/programVersions/context/evaluationSummary';
import NotFound from 'components/notFound';
import { ScholarDetailDataProvider } from 'components/scholarDetail/context/context';
// eslint-disable-next-line max-len
import ApprovalHistoryView from './sections/programVersions/views/ProgramVersionDetailsView/ApprovalHistoryView';
import { ApprovalHistoryContextProvider } from './sections/programVersions/context/approvalHistory';
import Subjects from './sections/subjects';
import Settings from './sections/settings';
import BulkEvaluationView from 'pages/dashboard/views/subjects.bulk';

/**
 * @param {object} props Properties.
 * @returns {React.Component} -
 */
export default function DashboardRoutes(props) {
	const { path } = props;

	return (
		<>
			<Switch>
				<Route exact path={`${path}/`} component={HomeView} />
				<Route path={`${path}/roles`} component={Roles} />
				<Route exact path={`${path}/users`} component={Users} />
				<Route exact path={`${path}/profile`} component={Profile} />
				<Route path={`${path}/candidates`} component={Candidates} />
				<Route path={`${path}/interns`} component={Interns} />
				<Route exact path={`${path}/scholars/:id/details`}>
					<ScholarDetailDataProvider>
						<DetailsView />
					</ScholarDetailDataProvider>
				</Route>
				<Route exact path={`${path}/scholars/:id/evaluation`}>
					<EvaluationContextProvider>
						<EvaluationView />
					</EvaluationContextProvider>
				</Route>
				<Route path={`${path}/scholars/:name?/`} component={Scholars} />
				<Route path={`${path}/settings`} component={Settings} />
				<Route exact path={`${path}/scholars`} component={Scholars} />
				<Route exact path={`${path}/subjects/:id?/`} component={Subjects} />
				<Route
					exact
					path={`${path}/subjects/:id/evaluation/`}
					component={BulkEvaluationView}
				/>
				<Route exact path={`${path}/program-versions`} component={ProgramVersions} />
				<Route exact path={`${path}/program-versions/:id/evaluations`}>
					<EvaluationSummaryContextProvider>
						<EvaluationSummaryView />
					</EvaluationSummaryContextProvider>
				</Route>
				<Route exact path={`${path}/program-versions/:id/subjectEvaluation`}>
					<EvaluationSummaryContextProvider>
						<SubjectEvaluation />
					</EvaluationSummaryContextProvider>
				</Route>
				<Route exact path={`${path}/program-versions/:id/approval-history`}>
					<ApprovalHistoryContextProvider>
						<ApprovalHistoryView />
					</ApprovalHistoryContextProvider>
				</Route>
				<Route exact path={`${path}/program-versions/:id`}>
					<ProgramVersionDetailsContextProvider>
						<ProgramVersionDetailsView />
					</ProgramVersionDetailsContextProvider>
				</Route>
				<Route path={`${path}/roles`} component={Roles} />
				<Route path='*' component={NotFound} />
			</Switch>
		</>
	);
}

DashboardRoutes.propTypes = {
	path: PropTypes.string,
};
