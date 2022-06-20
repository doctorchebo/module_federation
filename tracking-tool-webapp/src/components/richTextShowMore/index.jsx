import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RichText from 'components/richText/richText';
import Icons from 'components/icon';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - view component for list of cards.
 */
function RichTextShowMore(props) {
	const { description } = props;
	const [height, setHeight] = useState(0);
	const [classState, setClassState] = useState('');
	const [showMoreLessBtn, setShowMoreLessBtn] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const refRichText = useRef(null);
	const classClamp = 'rich-text-clamp';
	const classShow = 'rich-text-show';
	const heightDefault = 65;

	useEffect(() => {
		setHeight(refRichText.current.clientHeight);
		if (height > heightDefault) {
			setClassState(classClamp);
			setShowButton((state) => !state);
		}
	}, [height]);

	const onChange = () => {
		setShowMoreLessBtn(!showMoreLessBtn);
		classState === classClamp ? setClassState(classShow) : setClassState(classClamp);
	};

	return (
		<>
			<div className={`container-comment ${classState}`} ref={refRichText}>
				<RichText key='{item.id}' description={description} />
			</div>
			{showButton ? (
				<div className='container-buttons'>
					<div className='container-buttons-icon'>
						<Icons
							className={'icon'}
							onClick={onChange}
							name={`${showMoreLessBtn ? 'chevron-up' : 'chevron-down'}`}
						/>
					</div>
				</div>
			) : null}
		</>
	);
}

RichTextShowMore.propTypes = {
	description: PropTypes.string,
};

export default RichTextShowMore;
