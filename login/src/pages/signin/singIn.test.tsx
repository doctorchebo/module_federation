import SingIn from './index';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

describe('HTML structure', () => {
    const { container } = render(<SingIn onSignIn />)
    const form = container.querySelector('form');
    const inputs = form?.querySelectorAll('input');
    const buttons = form?.querySelectorAll('button');
    const link = form?.querySelectorAll('a');
    it('Should render sign in form', () => {
        expect(form).toBeInstanceOf(HTMLFormElement);
    })

    it('Should have 2 input elements', () => {    
        expect(inputs).toHaveLength(2);
        expect(inputs?.[0]).toBeInstanceOf(HTMLInputElement);
    })

    it('Should have 2 buttons', () => {
        expect(buttons).toHaveLength(2);
        expect(buttons?.[0]).toBeInstanceOf(HTMLButtonElement);
    })

    it('Should have 1 anchor', () => {
        expect(link).toHaveLength(1);
        expect(link?.[0]).toBeInstanceOf(HTMLAnchorElement);
    })

})
describe('Functionality', () => {
    it('Shoul trigger onChange event', () => {
        render(<SingIn onSignIn />)
        const emailTest = 'testing@hotmail.com';
        const passwordTest = 'Testing12345';
        const username: HTMLInputElement = screen.getByPlaceholderText('username');
        const password: HTMLInputElement = screen.getByPlaceholderText('password');

        fireEvent.change(username, { target: { value:'testing@hotmail.com' }})
        fireEvent.change(password, { target: { value:'Testing12345' }})

        expect(username.value).toBe(emailTest);
        expect(password.value).toBe(passwordTest);
    })
})

