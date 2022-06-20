import React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonSemantic } from 'semantic-ui-react';
import './index.css';

/**
 * Generic component for button
 *
 * @param {*} props Properties as semantic need
 * @returns {*} Generic Button
 */
function Button(props) {
	const { content, className, children, icon, ...rest } = props;
	return (
		<ButtonSemantic {...rest} className={`${className ? className : ''} custom-button`}>
			<div className={'button-container'}>
				<div className={'content'}>{content ? content : children}</div>
				{icon && <div className={'icon'}>{icon}</div>}
			</div>
		</ButtonSemantic>
	);
}

export default Button;

Button.propTypes = {
	content: PropTypes.any,
	icon: PropTypes.any,
	children: PropTypes.any,
	className: PropTypes.any,
};
