import React, { Component } from 'react';
import { List, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ApprovalItem from '../approval.item';
import AlertPopup from 'components/alertPopup';
import Locale from './locale/en.json';
import noop from 'helpers/Noop';
import './index.css';

/**
 * Renders the approval list component.
 *
 * @param {object} properties Properties.
 * @returns {Component} List component.
 */
function ApprovalList(properties) {
	const { value, loading, handleOnClickItem, showMessage, setShowMessage } = properties;

	return (
		<>
			<div className={'approvals-header'}>
				{`${Locale.title}`}
				<Loader active={loading} size={'mini'} inline />
			</div>
			<AlertPopup
				content={Locale.warningMessage}
				color={'yellow'}
				dismiss={showMessage}
				setDismiss={setShowMessage}
			/>
			<List animated selection verticalAlign={'middle'}>
				{value.map((item, index) => (
					<ApprovalItem key={index} value={item} onClickItem={handleOnClickItem} />
				))}
			</List>
		</>
	);
}

ApprovalList.defaultProps = {
	value: [],
	loading: false,
	handleOnClickItem: noop,
	showMessage: false,
	setShowMessage: noop,
};

ApprovalList.propTypes = {
	value: PropTypes.array,
	loading: PropTypes.bool,
	handleOnClickItem: PropTypes.func,
	showMessage: PropTypes.bool,
	setShowMessage: PropTypes.func,
};

export default ApprovalList;
