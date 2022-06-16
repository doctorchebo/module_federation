import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import locale from 'pages/dashboard/locale/en.json';

/**
 * this is a component that can be used in other side such as evaluation page
 *
 * @param { object } props description to Edit and Create in events
 * @returns {React.Component} Show description in events
 */

const RichTextEditor = (props) => {
	const { value, onChange, name, placeholder, label } = props;
	const [descriptionState, setDescriptionState] = useState('');
	const {
		inline,
		list,
		colorPicker,
		link,
		remove,
		emoji,
		bold,
		italic,
		underline,
		strikethrough,
		unorderedList,
		orderedList,
	} = locale.richTextOptions;

	useEffect(() => {
		if (value.length) {
			let htmlFormat;
			const blocks = '{"blocks":[{"key"';
			if (value.includes(blocks)) {
				htmlFormat = draftToHtml(JSON.parse(value));
			} else {
				htmlFormat = value;
			}
			const contentBlock = htmlToDraft(htmlFormat);
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			setDescriptionState(editorState);
		}
	}, []);

	const onEditorStateChange = (descriptionState) => {
		setDescriptionState(descriptionState);
		onChange({
			target: {
				name,
				value: JSON.stringify(convertToRaw(descriptionState.getCurrentContent())),
			},
		});
	};
	return (
		<div className='content-rich-text'>
			<div className='richLabel'>{label}</div>
			<Editor
				editorState={descriptionState}
				wrapperClassName='demo-wrapper'
				toolbarClassName='toolbarClassName'
				editorClassName='editorClassName'
				placeholder={placeholder}
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					options: [inline, list, colorPicker, link, remove, emoji],
					inline: {
						inDropdown: false,
						options: [bold, italic, underline, strikethrough],
					},
					list: {
						inDropdown: false,
						options: [unorderedList, orderedList],
					},
				}}
			/>
		</div>
	);
};

RichTextEditor.propTypes = {
	description: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.any,
};

RichTextEditor.defaultProps = {
	description: '',
	value: '',
	name: '',
	placeholder: '',
};

export default RichTextEditor;
