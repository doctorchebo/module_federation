import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon, Message } from 'semantic-ui-react';
import './index.css';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function ReportMessage(props) {
	const { dataErrors, status, fileName } = props;

	const manageColors = (status) => {
		switch (status) {
			case 'error':
				return 'red';
			case 'success':
				return 'green';
			default:
				return 'yellow';
		}
	};

	const manageSigns = () => {
		switch (status) {
			case 'error':
				return 'x';
			case 'success':
				return 'check circle';
			default:
				return 'warning sign';
		}
	};
	return (
		<Message icon className={`msg msg-${status}`}>
			<Icon name={manageSigns(status)} color={manageColors(status)} className='icon-msg' />
			<Message.Content>
				<Message.Header>{fileName}</Message.Header>
				<Message.List items={dataErrors} className='msg-list' />
			</Message.Content>
		</Message>
	);
}

ReportMessage.propTypes = {
	dataErrors: PropTypes.any,
	status: PropTypes.any,
	fileName: PropTypes.any,
};
