import React from 'react';
import { render } from '@testing-library/react';
import ScholarProgramForm from '../';
import locale from 'pages/dashboard/locale/en.json';

describe('pages/dashboard/components/scholars.program.form', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<ScholarProgramForm />);
			expect(container).toBeInstanceOf(HTMLElement);
		});

		test('Should render with custom properties', () => {
			const customProperties = {
				scholar: { id: 1, User: 'Test' },
				value: { programId: 'Dev32', description: 'test description' },
				form: locale.scholars.changeProgramForm,
				programs: [
					{ key: 1, text: 'prorgam1', value: 1 },
					{ key: 2, text: 'program2', value: 2 },
				],
				onCancel: () => {},
				onSubmit: () => {},
			};
			const { container } = render(<ScholarProgramForm {...customProperties} />);
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
