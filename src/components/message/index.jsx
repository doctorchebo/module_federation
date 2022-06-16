import React, { ElementType, useState } from 'react';
import { Message } from 'semantic-ui-react';

/**
 * This function is a wrapper to Message.
 *
 * @param {props} props Properties.
 * @returns {ElementType} Returns an element.
 */
function MessageComponent(props) {
	const [visible, setVisible] = useState(true);

	return <>{visible ? <Message onDismiss={() => setVisible(false)} {...props} /> : null}</>;
}

MessageComponent.propTypes = {};

export default MessageComponent;
