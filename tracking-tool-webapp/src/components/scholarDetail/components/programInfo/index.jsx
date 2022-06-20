import React from 'react';
import PropTypes from 'prop-types';
import { Header, Label } from 'semantic-ui-react';

/**
 * @param {object} props - properties.
 * @returns {React.Component} - Program Information component.
 */
function ProgramInfo(props) {
	const { title, programVersionName } = props;

	return (
		<>
			<Header as='h3' name='Title'>
				{title}
			</Header>
			<Label name='ProgramVersion-Name'>{programVersionName}</Label>
		</>
	);
}

ProgramInfo.propTypes = {
	title: PropTypes.string,
	programVersionName: PropTypes.string,
};

ProgramInfo.defaultProps = {
	title: 'Programs',
	programVersionName: 'No Active Program',
};

export default ProgramInfo;
