import React from 'react';
import { Segment } from 'semantic-ui-react';
import FileCard from './components/fileCard';
import PropTypes from 'prop-types';
import './index.css';

/**
 * @param {*} props -
 * @returns {React.Component} Generic File list component
 */
export default function FileList(props) {
	const { files, onDelete } = props;
	const filesCards = files.map((file, index) => {
		return (
			<FileCard
				fileName={file.fileName}
				progress={file.progress}
				status={file.status}
				key={index}
				message={file.message}
				id={index}
				onClose={onDelete}
			></FileCard>
		);
	});
	return (
		<Segment basic className='file-list'>
			{filesCards}
		</Segment>
	);
}

FileList.propTypes = {
	files: PropTypes.array,
	onDelete: PropTypes.func,
};

FileList.defaultProps = {
	files: [],
	onDelete: () => {},
};
