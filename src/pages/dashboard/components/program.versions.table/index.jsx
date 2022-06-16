import React, { useState } from 'react';
import { Header, Icon, Table } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomTableHeader from 'components/customTableHeader';
import programVersionsToTable from '../../sections/programVersions/helpers/mappers/programVersionsToTable';
import locale from '../../sections/programVersions/locale/en.json';
import ActionsMenu from 'components/actionsMenu';
import ConfirmModal from 'components/confirmModal';
import CreateFormProgramVersion from '../../sections/programVersions/views/CreateForm';
import { ProgramVersionsDataProvider } from '../../sections/programVersions/context';
import './styles.css';
import useSort from 'hooks/useSort/index.js';
import { Link } from 'react-router-dom';
import { useProgramVersionStore } from 'store/programVersionSlice/useProgramVersionStore';

/**
 * @param {object} props table elements
 * @returns {React.Component} personal table component
 */
function ProgramVersionsTable(props) {
	const { value, onSendReports, onSidebarOpen } = props;
	const { headers, rows } = programVersionsToTable(value);
	const { onSendSubjectEvaluationReports } = useProgramVersionStore();
	const [isOpenSubject, setIsOpenSubject] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(undefined);
	const approvalStage = 'InProgress';
	const pendingStage = 'Pending';
	const { sortedItems, requestSort, sortConfig } = useSort(rows);
	const getClassNamesForSort = (header) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === header ? sortConfig.direction : undefined;
	};

	/**
	 * @param {object} item - ProgramVersion Item
	 * @returns {Array} - Menu item name, action to execute.
	 */
	function setListAction(item) {
		const options = [
			{
				text: locale.actionMenu.evaluationSummary,
				as: NavLink,
				to: `/dashboard/program-versions/${item.id}/evaluations`,
			},
			{
				text: locale.actionMenu.candidates,
				as: NavLink,
				to: '/dashboard/candidates',
			},
			{
				text: locale.actionMenu.subjectEvaluation,
				as: NavLink,
				to: `/dashboard/program-versions/${item.id}/subjectEvaluation`,
			},
		];
		if (approvalStage.includes(item.stage)) {
			options.push(
				{
					text: locale.actionMenu.evaluationReport,
					onClick: () => {
						setIsOpen(true);
						setSelectedItem(item);
					},
				},
				{
					text: locale.actionMenu.subjectEvaluationReport,
					onClick: () => {
						setIsOpenSubject(true);
						setSelectedItem(item);
					},
				},
				{
					text: locale.actionMenu.formProgramVersion,
					onClick: () => {
						setSelectedItem(item);
						onSidebarOpen({
							header: null,
							content: (
								<ProgramVersionsDataProvider>
									<CreateFormProgramVersion item={item} />
								</ProgramVersionsDataProvider>
							),
							footer: null,
						});
					},
				}
			);
		} else if (pendingStage.includes(item.stage)) {
			options.push({
				text: locale.actionMenu.formProgramVersion,
				onClick: () => {
					setSelectedItem(item);
					onSidebarOpen({
						header: null,
						content: (
							<ProgramVersionsDataProvider>
								<CreateFormProgramVersion item={item} />
							</ProgramVersionsDataProvider>
						),
						footer: null,
					});
				},
			});
		}
		return options;
	}

	return (
		<>
			<Table className='table-container'>
				<CustomTableHeader
					headers={headers}
					requestSort={requestSort}
					getClassNamesForSort={getClassNamesForSort}
				/>
				<Table.Body>
					{sortedItems.map((item, index) => (
						<Table.Row key={index}>
							<Table.Cell>
								<Link
									key='path'
									to={`/dashboard/program-versions/${item.id}`}
									className='program-version-detail'
								>
									{item.version}
								</Link>
							</Table.Cell>
							<Table.Cell>
								<div className={`stage-container ${item.stage}`}>
									<Icon name='circle' />
									<Header.Content>{item.stage}</Header.Content>
								</div>
							</Table.Cell>
							<Table.Cell>
								<Icon name='calendar minus outline' size='large' />
								{item.duration}
							</Table.Cell>
							<Table.Cell>
								<Header className='coordinator-container'>
									{item.coordinator}
									<Header.Subheader>{item.email}</Header.Subheader>
								</Header>
							</Table.Cell>
							<Table.Cell textAlign='right'>
								<ActionsMenu itemList={setListAction(item)} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<ConfirmModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				action={() => onSendReports(selectedItem?.id)}
				content={`${locale.confirmModal.content} ${selectedItem?.stage}?`}
				header={locale.confirmModal.header}
			/>
			<ConfirmModal
				isOpen={isOpenSubject}
				setIsOpen={setIsOpenSubject}
				action={() => onSendSubjectEvaluationReports(selectedItem?.id)}
				content={`${locale.confirmModalSubject.content} ${selectedItem?.version}?`}
				header={locale.confirmModalSubject.header}
			/>
		</>
	);
}

ProgramVersionsTable.propTypes = {
	value: PropTypes.array,
	onSendReports: PropTypes.func,
	onSidebarOpen: PropTypes.func,
};

export default ProgramVersionsTable;
