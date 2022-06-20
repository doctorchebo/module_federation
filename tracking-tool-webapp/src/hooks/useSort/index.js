import React, { useMemo, useState } from 'react';
import { useUsersContext } from 'pages/dashboard/sections/users/context/usersContext';
import { hyphen } from 'pages/dashboard/sections/users/locale/en.json';
import LoggerService from 'services/LoggerService';

/**
 * @param {Array} items - component properties
 * @param {object} config - component properties
 * @returns {React.Component} - component for sorting a table column
 */
export default function useSort(items, config = null) {
	const [sortConfig, setSortConfig] = useState(config);
	const [usersState, actionsUsers] = useUsersContext();
	let sortableItems = [...items];
	const sortedItems = useMemo(() => {
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === Direction.ascending ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === Direction.ascending ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [items, sortConfig]);

	/**
	 * @param {string} key - column key value
	 * @param {boolean} backendSort - if true type needed and backend sort is going to be applied
	 * @param {string} type - type of items on table (ex. 'users')
	 */
	const requestSort = (key, backendSort = false, type = '') => {
		let direction = Direction.ascending;
		if (sortConfig && sortConfig.key === key && sortConfig.direction === Direction.ascending) {
			direction = Direction.descending;
		}
		setSortConfig({ key, direction });
		const sortKey = direction !== Direction.ascending ? hyphen.concat(key) : key;
		if (backendSort) {
			switch (type) {
				case 'users':
					actionsUsers.onUsersLoad({
						pageNumber: usersState.pagination.currentPage,
						pageSize: usersState.pagination.pageSize,
						sort: sortKey,
						totalPages: usersState.pagination.totalPages,
						filterValue: usersState.pagination.filterValue,
						filterOption: usersState.pagination.filterOption,
						criteria: usersState.pagination.criteria,
					});
					break;
				default:
					LoggerService.error(`unknown type ${type}`);
					break;
			}
		}
	};
	return { sortedItems, requestSort, sortConfig };
}

export const Direction = {
	ascending: 'ASC',
	descending: 'DESC',
};
