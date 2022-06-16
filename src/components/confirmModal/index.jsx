import React from 'react';
import { Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSessionStore } from 'store/sessionSlice/useSessionStore';
import './index.css';

/**
 * @param {*} props -
 * @returns {React.Component} - Generic Confirm Modal Component
 */
export default function ConfirmModal(props) {
	const { header, content, action, isOpen, setIsOpen, closeSession } = props;
	const { onLogout } = useSessionStore();

	/**
	 * @param {object} event - event from DOM
	 */
	function handleConfirm(event) {
		action();
		setIsOpen(false);
		event.stopPropagation();
		if (closeSession) {
			onLogout();
		}
	}

	/**
	 * @param {object} event - event from DOM
	 */
	function handleCancel(event) {
		setIsOpen(false);
		event.stopPropagation();
	}

	return (
		<Confirm
			className='confirm-modal'
			open={isOpen}
			header={header}
			content={content}
			onCancel={handleCancel}
			onConfirm={handleConfirm}
			confirmButton='Accept'
		/>
	);
}

ConfirmModal.propTypes = {
	header: PropTypes.string,
	content: PropTypes.string,
	action: PropTypes.func,
	isOpen: PropTypes.bool,
	setIsOpen: PropTypes.func,
	closeSession: PropTypes.bool,
};

ConfirmModal.defaultProps = {
	header: 'Confirm',
	context: 'Are you sure?',
};
