import React from 'react';
import { render } from '@testing-library/react';
import StatusManager from '../index';
import { StatusDataProvider } from '../context';

const customRender = (properties) => {
	return render(
		<StatusDataProvider>
			<StatusManager {...properties} />
		</StatusDataProvider>
	);
};

jest.mock('../list', () => {
	const timelineMock = () => <div>TimeLine Mock</div>;
	return timelineMock;
});

describe('pages/dashboard/views/scholar.status.history', () => {
	describe('Html structure', () => {
		test('Should render container by default', () => {
			const { container } = customRender({
				user: { id: '7b1beab2-1266-40ef-9178-43b35d7c0e9e' },
				showFormEvent: true,
			});
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
});
