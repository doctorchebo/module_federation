import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function MessageLogin(props) {
	return <>{props.value && <label className={'message'}>{props.value}</label>}</>;
}

MessageLogin.propTypes = {
	value: PropTypes.any,
};
