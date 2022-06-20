import React, { useState, useEffect } from 'react';
import { Accordion, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TextIcon from 'pages/dashboard/components/textIcon';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './style.css';
import { isTheRouteCorrectWithDesiredPath, getPathRedirected } from './helpers/menuPath';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import { useApplication } from 'application/context/AppContext';
import MenuSubjectItem from './item';

/**
 * @param {object} props - props for the component.
 * @returns {React.Component} react element component side menu content.
 */
export default function SubjectAccordion(props) {
	const { iconSecondary, name, link } = props;
	const [state, setState] = useState({ activated: false });
	const handleToggle = () => setState({ activated: !state.activated });
	const [appState] = useApplication();
	const userId = appState.profile.id;
	const complement = `user/${userId}`;

	const [detailsState, subjectActions] = useSubjectDetailsContext();
	const { subjects } = detailsState;

	useEffect(() => {
		subjectActions.onLoadSubjects(userId, complement);
	}, [userId]);

	useEffect(() => {
		subjectActions.onChangeActualSubject(subjects[0]);
	}, [subjects]);

	const isInRoute = isTheRouteCorrectWithDesiredPath(useLocation(), link);

	if (state.loadSubjects) {
		return <div>Loading...</div>;
	} else {
		const redirectSubject = getPathRedirected(subjects, link);
		return (
			<Accordion>
				<Accordion.Title active={state.activated} onClick={handleToggle}>
					<Menu.Item
						as={NavLink}
						to={redirectSubject}
						name={name}
						className={
							isInRoute
								? 'item active menu-item-secondary-exception'
								: 'menu-item-secondary-exception'
						}
					>
						<TextIcon color='grey' name={iconSecondary}>
							{name}
						</TextIcon>
					</Menu.Item>
				</Accordion.Title>
				<Accordion.Content active={state.activated}>
					{subjects.map((item) => (
						<MenuSubjectItem key={item.subjectId} {...item} />
					))}
				</Accordion.Content>
			</Accordion>
		);
	}
}

SubjectAccordion.propTypes = {
	name: PropTypes.string,
	iconSecondary: PropTypes.string,
	link: PropTypes.string,
};
