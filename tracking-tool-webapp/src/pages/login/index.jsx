import React from 'react';
// import { Grid, Header, Image, Segment } from 'semantic-ui-react';
// import locale from './locale/en.json';
// import LoginView from './views';
import { useHistory } from 'react-router';
import './index.css';
import { useApplication } from 'application/context/AppContext';

const RemoteApp = React.lazy(() => import('app2/App'));

/**
 * @returns {React.Component} -
 */
export default function Login() {
	const [state] = useApplication();
	const history = useHistory();

	/**
	 *
	 */
	function toProfile() {
		history.push('/dashboard');
	}

	return (
		<div className='login-container'>
			{/* <Grid verticalAlign={'top'} className='login'>
				<Segment basic className='personal-loading' loading={state.signIn} />
				<Grid.Column width={10}>
					<Image src={locale.brand} />
				</Grid.Column>
				<Grid.Column width={6} className='login-form'>
					<div className='form-data'>
						<Header as='h2'>{locale.welcome}</Header>
						<br />
						<LoginView redirectToProfile={toProfile} />
					</div>
				</Grid.Column>
			</Grid> */}
			<RemoteApp />
		</div>
	);
}
