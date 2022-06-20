import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from 'application';
import { ApplicationDataProvider } from 'application/context/AppContext';
import { ProfileProvider } from 'pages/profile/context';
import { SubjectDetailsDataProvider } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import './theme/index.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<ApplicationDataProvider>
			<SubjectDetailsDataProvider>
				<BrowserRouter>
					<ProfileProvider>
						<Application />
					</ProfileProvider>
				</BrowserRouter>
			</SubjectDetailsDataProvider>
		</ApplicationDataProvider>
	</Provider>,
	document.getElementById('root')
);
