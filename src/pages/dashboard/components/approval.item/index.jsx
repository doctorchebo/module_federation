import Icon from 'components/icon';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';
import Noop from 'helpers/Noop';

/**
 * Renders a item for Approval List
 *
 * @param {object} props Properties
 * @returns {Component} List Item component
 */
function ApprovalItem(props) {
	const { value, onClickItem } = props;

	return (
		<List.Item onClick={() => onClickItem(value)}>
			<List.Content>
				<div className={'approval-item'}>
					<Icon
						name={'check-circle'}
						className={`approval-check-icon ${value.checked && 'checked'}`}
					/>
					<List.Header>
						{`${value.userResponse.firstName}`} {`${value.userResponse.lastName} `}
					</List.Header>
					<List.Header className={'meta'}>{value.subjectResponse.name}</List.Header>
				</div>
			</List.Content>
		</List.Item>
	);
}

ApprovalItem.propTypes = {
	value: PropTypes.object,
	onClickItem: PropTypes.func,
};

ApprovalItem.defaultProps = {
	value: {
		userResponse: {
			firstName: '',
			lastName: '',
		},
		subjectResponse: {
			name: '',
		},
		checked: false,
	},
	onClickItem: Noop,
};

export default ApprovalItem;
