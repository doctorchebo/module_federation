import React from 'react';
import Header from 'components/header';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles.css';

/**
 * @param {*} properties Recived title and onBack method
 * @returns {React.Component} - Base Page
 */
export default function BasePage(properties) {
	const { icon, goTo, title, body, size } = properties;

	return (
		<div className='complete-page' id={size}>
			<div className='base-page'>
				<Button id='home-button' as={Link} to={goTo}>
					<Icon name={icon} />
				</Button>
				<Header className='header align-center' size='large'>
					{title}
				</Header>
				<div className='body-generic'>{body}</div>
			</div>
		</div>
	);
}
