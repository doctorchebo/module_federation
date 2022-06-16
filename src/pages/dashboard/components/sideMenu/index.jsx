import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import TextIcon from '../textIcon/index';
import { NavLink } from 'react-router-dom';
import locale from './locale/en.json';
import './index.css';
import JalaLogo from 'helpers/jalaLogo';
import PropTypes from 'prop-types';
import SubjectAccordion from 'components/subjectAccordion';

/**
 * @param {object} props - props for the component.
 * @returns {React.Component} react element component side menu content.
 */
function MenuSubject(props) {
	const { name, icon, link } = props;
	return (
		<Menu.Item as={NavLink} exact={true} to={link} name={name} className=''>
			<TextIcon color='grey' name={icon}>
				{'My ' + name}
			</TextIcon>
		</Menu.Item>
	);
}

MenuSubject.propTypes = {
	name: PropTypes.string,
	icon: PropTypes.string,
	link: PropTypes.string,
};

/**
 * @returns {React.Component} react element component side menu content.
 */
export default function SideMenu() {
	const {
		DashBoard,
		Users,
		Candidates,
		Scholars,
		Interns,
		title,
		Programs,
		Roles,
		Subjects,
		Settings,
	} = locale;
	return (
		<div className='side-sidebar-main'>
			<Menu secondary fixed='left' vertical className='side-bar-overflow'>
				<div className='jala-logo'>
					<JalaLogo />
				</div>
				<Header textAlign='center'>
					<Header.Subheader>{'Programs'}</Header.Subheader>
				</Header>
				<Menu.Item as={NavLink} exact={true} to={DashBoard.link} name={DashBoard.name}>
					<TextIcon color='grey' name={DashBoard.icon}>
						{DashBoard.name}
					</TextIcon>
				</Menu.Item>
				<Menu.Item as={NavLink} to={Programs.link} name={Programs.name}>
					<TextIcon color='grey' name={Programs.icon}>
						{Programs.name}
					</TextIcon>
				</Menu.Item>
				<SubjectAccordion {...Subjects} />
				<Menu.Item as={NavLink} to={Scholars.link} name={Scholars.name}>
					<TextIcon color='grey' name={Scholars.icon}>
						{Scholars.name}
					</TextIcon>
				</Menu.Item>
				<Menu.Menu>
					<Menu.Item
						as={NavLink}
						to={Candidates.link}
						name={Candidates.name}
						className='sub-menu-item'
					/>
					<Menu.Item
						as={NavLink}
						to={Scholars.link}
						name={Scholars.subtitle}
						className='sub-menu-item'
					/>
					<Menu.Item
						as={NavLink}
						to={Interns.link}
						name={Interns.name}
						className='sub-menu-item'
					/>
				</Menu.Menu>
				<Header textAlign='center'>
					<Header.Subheader>{title}</Header.Subheader>
				</Header>
				<Menu.Item as={NavLink} to={Users.link} name={Users.name}>
					<TextIcon color='grey' name={Users.icon}>
						{Users.name}
					</TextIcon>
				</Menu.Item>
				<Menu.Item as={NavLink} to={Roles.link} name={Roles.name}>
					<TextIcon color='grey' name={Roles.icon}>
						{Roles.name}
					</TextIcon>
				</Menu.Item>
				<Menu.Item as={NavLink} to={Settings.link} name={Settings.name}>
					<TextIcon color='grey' name={Settings.icon}>
						{Settings.name}
					</TextIcon>
				</Menu.Item>
			</Menu>
		</div>
	);
}
