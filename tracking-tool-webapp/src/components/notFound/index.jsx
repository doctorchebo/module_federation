import React from 'react';
import { useHistory } from 'react-router';
import { Header } from 'semantic-ui-react';
import './styles.css';

/**
 * @param {object} properties Properties.
 * @returns {React.Component} - notfound page.
 */
function NotFound(properties) {
	const history = useHistory();
	return (
		<div className='not-found'>
			<Header textAlign='center'>{properties.code}</Header>
			<div className='bg'></div>
			<Header textAlign='center'>
				{properties.content} <a onClick={() => history.goBack()}>{properties.back}</a>
			</Header>
		</div>
	);
}

export default NotFound;

NotFound.defaultProps = {
	code: 404,
	content: 'This is not the webpage you are looking for.',
	back: 'Go Back',
};
