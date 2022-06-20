import React from 'react';
import { Icon } from 'semantic-ui-react';

export const timelineItemProps = {
	value: {
		header: 'title test',
		subHeader: 'sub-title test',
		description: 'description test',
		date: 'february 2021',
	},
	className: 'timelineItem',
	icon: <Icon></Icon>,
};

export const timelineProps = {
	value: [
		{
			data: {
				header: 'title',
				subHeader: 'subtitle',
				description: 'description',
				date: 'date test',
			},
			metadata: {
				id: null,
				className: 'className Test',
				icon: 'home',
			},
		},
		{
			data: {
				header: 'title test',
				subHeader: 'subtitle test',
				description: 'description test',
				date: 'date test',
			},
			metadata: {
				id: 3,
				className: 'timelineItemTest',
				icon: 'home',
			},
		},
	],
	layout: '1-column-left',
	className: 'className Test',
};
