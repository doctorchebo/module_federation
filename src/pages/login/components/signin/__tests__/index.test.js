import { render, fireEvent } from '@testing-library/react';
import SignIn from '../index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

describe('pages/login/components/signIn', () => {
	describe('Html structure', () => {
		it('Should render modal', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLFormElement);
			expect(container.firstChild.childNodes).toHaveLength(4);
		});

		it('Should match snapshot', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it('Should render Input name', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const input = container.querySelector('[type="text"]');
			expect(input).toBeInstanceOf(HTMLInputElement);
		});

		it('Should render Input password', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const input = container.querySelector('[type="password"]');
			expect(input).toBeInstanceOf(HTMLInputElement);
		});

		it('Should render button', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const button = container.querySelector('[type="submit"]');
			expect(button.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render link and validate the content', () => {
			const linkText = 'Forgot password?';
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const link = container.querySelector('.reset-password-link');
			expect(link.textContent).toEqual(linkText);
		});
	});

	describe('Business logic', () => {
		it('Should trigger event when password is typed', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const input = container.querySelector('[type="password"]');
			expect(input).toBeInstanceOf(HTMLInputElement);
			fireEvent.change(input, { target: { value: 'Test123' } });
			expect(input.value).toBe('Test123');
		});

		it('Should trigger event when email is typed', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const input = container.querySelector('[type="text"]');
			fireEvent.change(input, { target: { value: 'ale@gmail.com' } });
			expect(input.value).toBe('ale@gmail.com');
		});

		it('Should trigger event when email error', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const input = container.querySelector('[type="text"]');
			fireEvent.change(input, { target: { value: 'ale' } });
			expect(input.value).toBe('ale');
		});

		it('Should trigger event when eye icon is clicked', () => {
			const { container } = render(
				<Provider store={mockStoreConfig({})}>
					<BrowserRouter>
						<SignIn />
					</BrowserRouter>
				</Provider>
			);
			const icon = container.querySelector('.eye.link.icon');
			fireEvent.click(icon);
			const input = container.querySelector('[type="password"]');
			expect(input).toBeNull();
		});
	});
});
