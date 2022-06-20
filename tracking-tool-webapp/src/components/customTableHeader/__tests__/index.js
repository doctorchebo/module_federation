import React from 'react';
import { render } from '@testing-library/react';
import CustomTableHeader from '..';

const headers = ['Version', 'Stage', 'Duration', 'Coordinator'];

const table = document.createElement('table');
describe('components/customTableHeader', () => {
	it('Should render table header by default', () => {
		const { container } = render(<CustomTableHeader headers={headers} />, {
			container: document.body.appendChild(table),
		});
		expect(container.firstChild).toBeInstanceOf(HTMLTableSectionElement);
	});
	it('Should render table header with its all columns', () => {
		const { container } = render(<CustomTableHeader headers={headers} />, {
			container: document.body.appendChild(table),
		});
		expect(container.querySelector('[name="Version"]').textContent).toBe('Version');
		expect(container.querySelector('[name="Stage"]').textContent).toBe('Stage');
		expect(container.querySelector('[name="Duration"]').textContent).toBe('Duration');
		expect(container.querySelector('[name="Coordinator"]').textContent).toBe('Coordinator');
	});
});
