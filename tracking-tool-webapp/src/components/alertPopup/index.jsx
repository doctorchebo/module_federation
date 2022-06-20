import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * @param {*} props -
 * @returns {React.Component} - Generic Alert Popup Component
 */
export default function AlertPopup(props) {
	const { header, content, color, dismiss, setDismiss } = props;

	/**
	 * Handle dismiss icon
	 */
	function handleDismiss() {
		setDismiss(false);
	}

	return (
		<>
			{dismiss && (
				<Message
					color={color}
					onDismiss={handleDismiss}
					header={header}
					content={content}
				/>
			)}
		</>
	);
}

AlertPopup.propTypes = {
	header: PropTypes.string,
	content: PropTypes.string,
	color: PropTypes.string,
	dismiss: PropTypes.bool,
	setDismiss: PropTypes.func,
};
AlertPopup.defaultProps = {
	header: '',
	content: '',
	color: 'red',
};
