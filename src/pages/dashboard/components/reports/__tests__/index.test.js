import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UploadReports from '../index';
import { UsersDataProvider } from 'pages/dashboard/sections/users/context/usersContext';

const mockData = {
	data: [
		{
			dataErrors: ['email not valid'],
			status: 'error',
			totalSuccess: 0,
			totalError: 1,
		},
	],
};
const onCloseMock = jest.fn();
const onResetMock = jest.fn();
describe('UploadReports component', () => {
	it('Should render UploadReports', () => {
		const { container } = render(
			<UsersDataProvider>
				<UploadReports reports={mockData} onClose={onCloseMock} onReset={onResetMock} />
			</UsersDataProvider>
		);
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});

	it('Should call handleClose', () => {
		const { container } = render(
			<UsersDataProvider>
				<UploadReports reports={mockData} onClose={onCloseMock} onReset={onResetMock} />
			</UsersDataProvider>
		);
		const button = container.querySelector('.button');

		fireEvent.click(button);

		expect(onCloseMock).toHaveBeenCalled();
		expect(onResetMock).toHaveBeenCalled();
	});
});
