import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import jwt_decode from 'jwt-decode';
import 'jest-canvas-mock';
import CardEvent from '..';

jest.mock('jwt-decode');

const scholarEvent = {
	user: 'Osmar Ugarte',
	userId: 'guid-id',
	stage: 'Backend',
	title: 'Has exceed expectations',
	modifiedAt: 'May 16, 2020',
	eventType: { id: 'guid', name: 'Informational' },
	description: 'During the may projects, he has guided its team towards important decision',
};

const DATE_SETTINGS = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
};

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<CardEvent {...properties} />);
	const element = container.querySelector('[name="card-container"]');

	return element;
}

describe('components/CardEvent', () => {
	beforeEach(() => {
		jwt_decode.mockImplementation(() => {
			return { sub: 'guid-id' };
		});
	});

	it('Should render scholar events', () => {
		const element = customRender({ event: scholarEvent });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
	});

	it('Should render data from parameters', () => {
		const element = customRender({ event: scholarEvent });
		expect(element.querySelector('.img-container')).toBeDefined();
		expect(element.querySelector('[name="card-header"]')).toHaveTextContent(
			'Osmar Ugarte added an event in Backend'
		);
		expect(element.querySelector('[name="card-tittle"]')).toHaveTextContent(
			'Has exceed expectations'
		);
		expect(element.querySelector('[name="card-metadata"]')).toHaveTextContent(
			`Informational${new Date('May 16, 2020, 12:00 AM').toLocaleString(
				[],
				DATE_SETTINGS
			)} · Edited`
		);
		expect(element.querySelector('[name="card-description"]')).toHaveTextContent(
			'During the may projects, he has guided its team towards important decision'
		);
	});

	it('should click on edit button', async () => {
		const onClick = jest.fn();
		const { container } = render(<CardEvent event={scholarEvent} onAction={onClick} />);
		const editIcon = container.querySelector('.icon');
		fireEvent.click(editIcon);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
