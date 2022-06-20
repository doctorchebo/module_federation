import Icon from 'components/icon';
import React, { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * Comment box to use in Evaluation section
 *
 * @param {object} properties States to handle his rendering
 * @returns {React.Component} A component with two modes Readonly or Edit
 */
export default function CommentBox(properties) {
	const { value, onChange, readonly } = properties;
	const [readOnly, setReadOnly] = useState(true);

	return (
		<Message className={'comment-box'}>
			<Message.Header>
				{value.title}
				{!readonly && !readOnly && (
					<Icon
						name={'check'}
						className={'icon check'}
						onClick={() => {
							setReadOnly(true);
						}}
					/>
				)}
			</Message.Header>
			<div className={'content'}>
				{readonly || (!readonly && readOnly) ? (
					<p onClick={() => setReadOnly(false)}>{value.content || 'Nothing here yet'}</p>
				) : (
					<Form as='div'>
						<Form.TextArea
							floated={'left'}
							defaultValue={value.content}
							className={'input'}
							onChange={(e, { value }) => onChange(value)}
						/>
					</Form>
				)}
			</div>
		</Message>
	);
}

CommentBox.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
	readonly: PropTypes.bool,
};

CommentBox.defaultProps = {
	value: {
		title: '',
		content: '',
	},
	onChange: () => {},
	readonly: false,
};
