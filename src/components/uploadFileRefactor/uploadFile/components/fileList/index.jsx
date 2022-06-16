import React from 'react';
import { Segment } from 'semantic-ui-react';
import FileCard from '../fileCard';
import './styles.css';

/**
 * @param {*} properties -
 * @returns {React.Component} Generic File list component
 */
export default function FileList(properties) {
	const { fileMethods, cardInfo, filesInfo, extraData } = properties;

	const filesCards = filesInfo.map((fileObject, index) => {
		return (
			<FileCard
				key={index}
				file={{
					id: index,
					fileObject: fileObject,
				}}
				cardInfo={cardInfo}
				fileMethods={fileMethods}
				extraData={extraData}
			></FileCard>
		);
	});
	return (
		<Segment basic className='file-list'>
			{filesCards}
		</Segment>
	);
}
