import React from 'react';
import './container.css';
import { Container as SContainer } from 'semantic-ui-react';

const Container = ({ children }: { children: JSX.Element }) => {
	return <SContainer fluid>{children}</SContainer>;
};

export default Container;
