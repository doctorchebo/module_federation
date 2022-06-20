import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import locale from './../../../../application/locale/en.json';
import { PropTypes } from 'prop-types';
import './style.css';

const Search = ({ selectSearchValue, searchValueRef }) => {
	const [inputValue, setInputValueItem] = useState('');
	searchValueRef.current = inputValue;

	const handleChange = (event) => setInputValueItem(event.target.value);

	const handleClick = () => selectSearchValue(inputValue);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	};

	return (
		<div className='search-container'>
			<Input
				icon='search'
				value={inputValue}
				placeholder={locale.searchPlaceholder}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
			/>
			<Button onClick={handleClick}>Search</Button>
		</div>
	);
};

Search.propTypes = {
	selectSearchValue: PropTypes.any,
	searchValueRef: PropTypes.any,
};
export default Search;
