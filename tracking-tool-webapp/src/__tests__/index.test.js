import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
	it('should render without crashing', () => {
		const div = document.createElement('div');
		div.id = 'root';
		document.body.appendChild(div);
		require('../index.js');
		expect(ReactDOM.render).toHaveBeenCalled();
		expect(ReactDOM.render).not.toThrowError();
	});
});
