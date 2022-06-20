import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import { Table, Image, Icon } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import ScholarDetail from 'components/scholarDetail';
import ScholarsDetailRow from 'pages/dashboard/components/scholars.detail.row';
import ActionsMenu from 'components/actionsMenu';
import locale from 'pages/dashboard/locale/en.json';
import { NavLink } from 'react-router-dom';
import './styles.css';
import RightSidebarEvent from 'pages/dashboard/components/RightSidebarEvent';
import { useScholarsContext } from 'pages/dashboard/sections/scholars/context';
/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom table row with for expandable content
 */
function CustomTableRow(props) {
	const {
		item,
		numberOfCells,
		expanded,
		openRightSideBarEvent,
		openRightSideBarProgram,
		onHideRightSidebarEvent,
	} = props;
	const [isExpanded, setExpanded] = useState(expanded);
	const [state] = useScholarsContext();

	if (!item.Version) {
		item.Version = 'Has no Program';
	}
	const detailsUrl = `/dashboard/scholars/${item.id}/details`;

	useEffect(() => {
		setExpanded(false);
	}, [state.isChangePaginator]);
	/**
	 * @returns {Array} - Menu item name, action to execute.
	 */
	function setListAction() {
		return [
			{
				text: locale.actionMenu.Details,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={false} statusForm={false} />
						),
						footer: null,
						onHide: onHideRightSidebarEvent,
					});
				},
			},
			{
				text: locale.actionMenu.addEvent,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={true} statusForm={false} />
						),
						footer: null,
						onHide: onHideRightSidebarEvent,
					});
				},
			},
			{
				text: locale.actionMenu.evaluation,
				as: NavLink,
				to: `/dashboard/scholars/${item.id}/evaluation`,
			},
			{
				text: locale.actionMenu.enrollInProgram,
				onClick: () => {
					openRightSideBarProgram(item);
				},
			},
			{
				text: locale.actionMenu.changeStatus,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={false} statusForm={true} />
						),
						footer: null,
						onHide: onHideRightSidebarEvent,
					});
				},
			},
		];
	}
	/**
	 * @returns {Array} - Menu item name, action to execute.
	 */
	function setExpandedListAction() {
		return [
			{
				content: <a>{locale.actionMenu.Details}</a>,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={false} statusForm={false} />
						),
						footer: null,
					});
				},
			},
			{
				content: <a>{locale.actionMenu.addEvent}</a>,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={true} statusForm={false} />
						),
						footer: null,
					});
				},
			},
			{
				content: <a>{locale.actionMenu.evaluation}</a>,
				as: NavLink,
				to: `/dashboard/scholars/${item.id}/evaluation`,
			},
			{
				content: <a>{locale.actionMenu.enrollInProgram}</a>,
				onClick: () => {
					openRightSideBarProgram(item);
				},
			},
			{
				content: <a>{locale.actionMenu.changeStatus}</a>,
				onClick: () => {
					openRightSideBarEvent({
						header: null,
						content: (
							<RightSidebarEvent item={item} eventForm={false} statusForm={true} />
						),
						footer: null,
					});
				},
			},
		];
	}

	return (
		<>
			<Table.Row name='Custom-Row' className='scholar-row new-row-card'>
				<Table.Cell>
					<Icon
						className='u-cursor-pointer'
						onClick={() => setExpanded(!isExpanded)}
						name={!isExpanded ? 'angle right' : 'angle down'}
					/>
				</Table.Cell>
				<Table.Cell name='full-name'>
					<div className='cell-compose-content'>
						<span className='new-subtitle' id='label-title'>
							User:
						</span>
						<span>
							<Image spaced circular size='mini' src={imageProfile} />
							<NavLink to={detailsUrl}>{item.User}</NavLink>
						</span>
					</div>
				</Table.Cell>
				<Table.Cell name='applicant-type'>
					<div className='cell-compose-content'>
						<span className='new-subtitle' id='label-title'>
							Type:
						</span>
						{item.Type}
					</div>
				</Table.Cell>
				<Table.Cell name='email'>
					<div className='cell-compose-content'>
						<span className='new-subtitle' id='label-title'>
							Email:
						</span>
						<NavLink to={detailsUrl}>{item.EmailAddress}</NavLink>
					</div>
				</Table.Cell>
				<Table.Cell name='phoneNumber'>
					<div className='cell-compose-content'>
						<span className='new-subtitle' id='label-title'>
							Phone number:
						</span>
						{item.PhoneNumber}
					</div>
				</Table.Cell>
				<Table.Cell name='versionName'>
					<div className='cell-compose-content'>
						<span className='new-subtitle' id='label-title'>
							Version:
						</span>
						{item.Version}
					</div>
				</Table.Cell>
				<Table.Cell name='status' className={ClassNames('status', item.StatusClass)}>
					<div className={ClassNames(item.StatusClass)}></div>
					{item.Status}
				</Table.Cell>
				<Table.Cell name='actions' textAlign='right' className='new-action-cell'>
					{item.Version !== 'Has no Program' ? (
						<div className='new-action'>
							<ActionsMenu itemList={setListAction()} />
						</div>
					) : null}
				</Table.Cell>
			</Table.Row>
			{isExpanded ? (
				<ScholarsDetailRow name='Expanded-Row' numberOfCells={numberOfCells}>
					<ScholarDetail
						scholarId={item.id}
						itemList={item.Version !== 'Has no Program' ? setExpandedListAction() : []}
					/>
				</ScholarsDetailRow>
			) : null}
		</>
	);
}

CustomTableRow.propTypes = {
	item: PropTypes.object,
	numberOfCells: PropTypes.number,
	expanded: PropTypes.bool,
	onSelectScholar: PropTypes.func,
	openRightSideBarEvent: PropTypes.func,
	openRightSideBarProgram: PropTypes.func,
	onHideRightSidebarEvent: PropTypes.func,
	resetDetail: PropTypes.bool,
};
CustomTableRow.defaultProps = {
	item: null,
	numberOfCells: 6,
	expanded: false,
	resetDetail: false,
};

export default CustomTableRow;
