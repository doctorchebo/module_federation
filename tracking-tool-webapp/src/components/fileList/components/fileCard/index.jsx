import React from 'react';
import { Message, Icon, Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * @param {*} props -
 * @returns {React.Component} Generic File card component
 */
export default function FileCard(props) {
	const { fileName, progress, status, onClose, message, id } = props;
	let errorMessage = '';

	/**
	 * @returns  {React.Component} Progress Bar
	 */
	function progressBar() {
		if (status === 'loading') {
			return (
				<Progress
					value={progress}
					total='100'
					progress='percent'
					size='small'
					color='blue'
					className='progress_bar'
				/>
			);
		}
	}
	const statusIcon = () => {
		if (status === 'success') {
			return <Icon name='check circle outline' color='green' className='icon_status' />;
		}

		if (status === 'error') {
			const [title, errors] = message.split(': ');
			errorMessage = (
				<div className='fileMessage_error'>
					<p className='fileMessage_error__title' name='error_title'>
						{title}:
					</p>
					<p className='fileMessage_error__description' name='error_description'>
						{errors}
					</p>
				</div>
			);
			return <Icon name='times circle outline' color='red' className='icon_status' />;
		}

		if (status === 'validing') {
			errorMessage = <div className='fileMessage_validing'>validing...</div>;
			return <Icon name='spinner' loading color='grey' className='icon_status' />;
		}
	};

	return (
		<Message
			onDismiss={() => {
				onClose(id);
			}}
			className='file_card'
			size='small'
		>
			<Message.Content className='content'>
				<Icon name='file alternate outline' size='big' color='grey' />
				<div className='info_content'>
					<div>
						{fileName}
						{statusIcon()}
					</div>
					{progressBar()}
					{errorMessage}
				</div>
			</Message.Content>
		</Message>
	);
}

FileCard.propTypes = {
	fileName: PropTypes.string,
	progress: PropTypes.string,
	status: PropTypes.string,
	onClose: PropTypes.func,
	message: PropTypes.string,
	id: PropTypes.number,
};

FileCard.defaultProps = {
	fileName: '',
	progress: '0',
	status: '',
	onClose: () => {},
	message: 'error',
	id: -1,
};
