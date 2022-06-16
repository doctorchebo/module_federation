import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.css';
import { getUrl } from './helpers/menuPath';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';

/**
 * @param {object} props - props for the component.
 * @returns {React.Component} react element component side menu content.
 */
export default function MenuSubjectItem(props) {
	const { subjectName, programVersionName, subjectId } = props;
	const completeLink = getUrl(subjectId);

	const [, subjectActions] = useSubjectDetailsContext();

	const onClickSubject = () => {
		subjectActions.onChangeActualSubject(props);
	};

	return (
		<Menu.Item
			as={NavLink}
			to={completeLink}
			name={`${programVersionName} - ${subjectName}`}
			className='sub-menu-item'
			onClick={onClickSubject}
		/>
	);
}

MenuSubjectItem.propTypes = {
	subjectName: PropTypes.string,
	programVersionName: PropTypes.string,
	subjectId: PropTypes.string,
	icon: PropTypes.string,
};
