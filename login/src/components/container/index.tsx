import React from 'react';
import './container.css';

const Container = ({ children }: { children: JSX.Element }) => {
	return <div className='container'>{children}</div>;
};

export default Container;
