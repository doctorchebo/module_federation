/* eslint-disable max-len */
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying an input
 */
function CandidatesInputFilter(props) {
	const { setFilter, placeholder } = props;
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		const entry = e.target.value;
		setInputValue(entry);
		if (inputValue.trim().length >= 0) {
			setFilter(entry.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
		}
	};
	return (
		<Input
			placeholder={placeholder}
			type={'text'}
			value={inputValue}
			onChange={handleInputChange}
		/>
	);
}

CandidatesInputFilter.propTypes = {
	setFilter: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
};

export default CandidatesInputFilter;
