export const programVersion = {
	version: 'version',
	program: 'program',
	startDate: 'startDate',
	endDate: 'endDate',
	coordinator: 'coordinator',
	stages: 'stages',
};

export const stage = {
	stageNumber: 'stageNumber',
	name: 'name',
	startDate: 'startDate',
	endDate: 'endDate',
	approvalRequired: 'approvalRequired',
	subjects: 'subjects',
};

export const subject = {
	subjectNumber: 'subjectNumber',
	name: 'name',
	trainer: 'trainer',
};

export const programVersionFileMessages = {
	invalidExtension: 'Is not a valid file extension type',
	invalidStructure:
		// eslint-disable-next-line max-len
		'The required structure for the file is: {version, program, startDate, endDate, coordinator, stages:[{order, name, startDate, endDate, approvalRequired, subjects: [{number, trainer, name}]}]}}',
	invalidSize: 'The size of the file is greater than the maximum supported (5Mb)',
};

export const MAX_SIZE_FILE = 5; //size in Mb.
