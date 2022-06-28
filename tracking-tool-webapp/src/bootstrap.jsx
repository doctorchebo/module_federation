import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Application from 'application';
import { ApplicationDataProvider } from 'application/context/AppContext';
import { ProfileProvider } from 'pages/profile/context';
import { SubjectDetailsDataProvider } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import './theme/index.css';
import { createRoot } from 'react-dom/client';
const store = configureStore();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
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
	</Provider>
);
