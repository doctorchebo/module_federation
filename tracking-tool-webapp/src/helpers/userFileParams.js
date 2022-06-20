/* eslint-disable max-len */
export const userHeadersFile = [
	{ column: 1, value: 'Name' },
	{ column: 2, value: 'LastName' },
	{ column: 3, value: 'Email' },
	{ column: 4, value: 'CI' },
	{ column: 5, value: 'Issued' },
	{ column: 6, value: 'PhoneNumber' },
	{ column: 7, value: 'CurrentCity' },
	{ column: 8, value: 'Role' },
];

export const MAX_SIZE_FILE = 5; //size in Mb.

export const userFileMessages = {
	invalidExtension: 'is not a valid file extension',
	invalidHeaders:
		'The required structure for the file is: Name,LastName,Email,Role,CI,Issued,PhoneNumber,CurrentCity',
	invalidSize: 'The size of the file is greater than the maximum supported (5Mb)',
};
