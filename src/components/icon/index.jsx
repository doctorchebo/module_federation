import {
	AcademicCapIcon,
	AnnotationIcon,
	ArchiveIcon,
	BellIcon,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ClipboardCheckIcon,
	CloudUploadIcon,
	DocumentTextIcon,
	DotsVerticalIcon,
	FilterIcon,
	HomeIcon,
	PencilAltIcon,
	PlusIcon,
	RefreshIcon,
	SearchIcon,
	UserCircleIcon,
	UserIcon,
	ViewListIcon,
	XIcon,
} from '@heroicons/react/outline';
import { Trash } from 'heroicons-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Popup } from 'semantic-ui-react';
import { icons } from './iconsEnum';
import './index.css';
import RatingIcon from './ratingIcon';

/**
 * Icon component rendering by name
 *
 * @param {*} props name of icon
 * @param {*} tooltipText name of tooltip
 * @returns {*} Icon component
 */
function Icon(props) {
	const { name, tooltipText, ...rest } = props;
	return tooltipText ? (
		<Popup
			style={{ zIndex: 10000 }}
			content={tooltipText}
			trigger={getIcon(name, props, rest)}
		/>
	) : (
		getIcon(name, props, rest)
	);
}

const getIcon = (name, props, rest) => {
	switch (name) {
		case icons.academicCap:
			return <AcademicCapIcon {...props} />;
		case icons.annotation:
			return <AnnotationIcon {...props} />;
		case icons.archive:
			return <ArchiveIcon {...props} />;
		case icons.bell:
			return <BellIcon {...props} />;
		case icons.checkCircle:
			return <CheckCircleIcon {...props} />;
		case icons.check:
			return <CheckIcon {...props} />;
		case icons.chevronLeft:
			return <ChevronLeftIcon {...props} />;
		case icons.chevronRight:
			return <ChevronRightIcon {...props} />;
		case icons.chevronDown:
			return <ChevronDownIcon {...props} />;
		case icons.chevronUp:
			return <ChevronUpIcon {...props} />;
		case icons.clipboardCheck:
			return <ClipboardCheckIcon {...props} />;
		case icons.cloudUpload:
			return <CloudUploadIcon {...props} />;
		case icons.documentText:
			return <DocumentTextIcon {...props} />;
		case icons.dotsVertical:
			return <DotsVerticalIcon {...props} />;
		case icons.filter:
			return <FilterIcon {...props} />;
		case icons.home:
			return <HomeIcon {...props} />;
		case icons.pencilAlt:
			return <PencilAltIcon {...props} />;
		case icons.plus:
			return <PlusIcon {...props} />;
		case icons.rating:
			return <RatingIcon {...rest} />;
		case icons.refresh:
			return <RefreshIcon {...props} />;
		case icons.search:
			return <SearchIcon {...props} />;
		case icons.user:
			return <UserIcon {...props} />;
		case icons.userCircle:
			return <UserCircleIcon {...props} />;
		case icons.viewList:
			return <ViewListIcon {...props} />;
		case icons.x:
			return <XIcon {...props} />;
		case icons.trash:
			return <Trash {...props} />;
		default:
			return <></>;
	}
};

export default Icon;

Icon.propTypes = {
	name: PropTypes.string,
	tooltipText: PropTypes.string,
};
