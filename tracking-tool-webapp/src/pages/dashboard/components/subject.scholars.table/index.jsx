import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';
import ActionsMenu from 'components/actionsMenu';
import CustomTableHeader from 'components/customTableHeader';
import ProfileImage from 'pages/dashboard/components/profileImage';
import RichTextFirstLineText from 'pages/dashboard/components/richTextFirstLineText/richTextFirstLineText';
import useSort from 'hooks/useSort/index.js';
import { ConvertToMonthYear } from 'helpers/dateConverter';
import { imageProfile } from 'helpers/Dashboard';
import subjectScholarsToTable from 'pages/dashboard/sections/subjects/helpers/mappers/subjectScholarsToTable';
import locale from 'pages/dashboard/sections/subjects/locale/en.json';
import { useApplication } from 'application/context/AppContext';
import RightSidebarEvaluate from 'pages/dashboard/components/RightSidebarEvaluate';
import RightSidebarEvaluationHistory from 'pages/dashboard/components/RightSidebarEvaluationHistory';
import RightSidebarEvaluation from 'pages/dashboard/components/RightSidebarEvaluation';

/**
 * @param {object} props table elements
 * @returns {React.Component} personal table component
 */
function SubjectScholarsTable(props) {
	const { value, subjectId } = props;
	const { headers, rows } = subjectScholarsToTable(value);
	const { sortedItems, requestSort, sortConfig } = useSort(rows);
	const getClassNamesForSort = (header) =>
		sortConfig?.key === header ? sortConfig?.direction : '';
	const [, appActions] = useApplication();

	/**
	 * @param {object} item - Scholar Id
	 * @param {string} subjectId - Subject evaluationId
	 * @returns {Array} - Menu item name, action to execute.
	 */
	function setListAction(item, subjectId) {
		/**
		 * a skeleton to add sidebar view for update and edit
		 *
		 * @param {object} component - the component that will be opened on the side bar
		 */
		const addSideBarView = (component) => {
			appActions.onSidebarAddView({
				header: null,
				content: component,
				footer: null,
				onHide: () => {
					appActions.onHideSidebar();
					appActions.onShareInformation({ eventFormValues: {} });
				},
			});
		};

		return [
			{
				text: locale.actionMenu.evaluate,
				onClick: () => {
					appActions.onSidebarAddView({
						header: null,
						content: <RightSidebarEvaluate item={item} subjectId={subjectId} />,
						footer: null,
						onHide: () => {
							appActions.onHideSidebar();
							appActions.onShareInformation({ eventFormValues: {} });
						},
					});
				},
			},
			{
				text: locale.actionMenu.history,
				onClick: () => {
					appActions.onSidebarAddView({
						header: null,
						content: (
							<RightSidebarEvaluationHistory
								item={props}
								updateForm={false}
								createForm={false}
								statusForm={false}
								displayNewView={true}
								data={{ ...item, subjectId: subjectId }}
								onAction={(event) => {
									addSideBarView(
										<RightSidebarEvaluation
											item={props}
											updateForm={true}
											statusForm={false}
											displayNewView={true}
											data={event}
										/>
									);
								}}
							/>
						),
						footer: null,
						onHide: () => {
							appActions.onHideSidebar();
							appActions.onShareInformation({ eventFormValues: {} });
						},
					});
				},
			},
		];
	}

	return (
		<Table className='table-container'>
			<CustomTableHeader
				headers={headers}
				requestSort={requestSort}
				getClassNamesForSort={getClassNamesForSort}
			/>
			<Table.Body>
				{sortedItems.map((item, index) => (
					<Table.Row key={index} className='new-row-card'>
						<Table.Cell>
							<div className='cell-compose-content'>
								<span className='new-subtitle' id='label-title'>
									Scholar Name:
								</span>
								<div className='cell-compose-content'>
									<ProfileImage
										color={item.color || ''}
										size='mini'
										src={imageProfile}
									/>
									{item.scholarName}
								</div>
							</div>
						</Table.Cell>
						<Table.Cell>
							<div className='cell-compose-content'>
								<span className='new-subtitle' id='label-title'>
									Last grade date:
								</span>
								{item.lastGradeDate ? ConvertToMonthYear(item.lastGradeDate) : null}
							</div>
						</Table.Cell>
						<Table.Cell>
							<div className='cell-compose-content'>
								<span className='new-subtitle' id='label-title'>
									Grade:
								</span>
								{item.grade}
							</div>
						</Table.Cell>
						<Table.Cell>
							<div className='cell-compose-content'>
								<span className='new-subtitle' id='label-title'>
									Last comment:
								</span>
								<div className='text-with-ellipsis'>
									<RichTextFirstLineText
										key='{index}'
										description={item.lastComment}
									/>
								</div>
							</div>
						</Table.Cell>
						<Table.Cell textAlign='right' className='new-action-cell'>
							<div className='new-action'>
								<ActionsMenu itemList={setListAction(item, subjectId)} />
							</div>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

SubjectScholarsTable.propTypes = {
	value: PropTypes.array,
	subjectId: PropTypes.string,
	onSendReports: PropTypes.func,
	onSidebarOpen: PropTypes.func,
};

export default SubjectScholarsTable;
