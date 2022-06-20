export const scholarHeadersFile = [
	{ column: 1, value: 'Name', optional: false },
	{ column: 2, value: 'LastName', optional: false },
	{ column: 3, value: 'Email', optional: false },
	{ column: 4, value: 'PhoneNumber', optional: false },
	{ column: 5, value: 'CI', optional: false },
	{ column: 6, value: 'Version', optional: false },
	{ column: 7, value: 'PersonalEmail', optional: true },
	{ column: 8, value: 'CurrentCity', optional: true },
	{ column: 9, value: 'University', optional: true },
	{ column: 10, value: 'Career', optional: true },
	{ column: 11, value: 'AcademicDegree', optional: true },
];

const bolivianCities = [
	'beni',
	'chuquisaca',
	'cochabamba',
	'la paz',
	'oruro',
	'pando',
	'potosi',
	'santa cruz',
	'tarija',
];

export const scholarFileMessages = {
	invalidExtension: 'Is not a valid file extension type',
	invalidHeaders:
		// eslint-disable-next-line max-len
		'The required structure for the file is: Name,LastName,Email,PhoneNumber,CI,Version,PersonalEmail,CurrentCity,University,Career,AcademicDegree',
	invalidSize: 'The size of the file is greater than the maximum supported (5Mb)',
};

export const MAX_SIZE_FILE = 5; //size in Mb.
/**
 * @param {string} city city introduced to compare
 * @returns {boolean} if the city exist in Bolivia.
 */
function isCityValid(city) {
	return bolivianCities.includes(city.toLowerCase());
}

export const CONFIG_SCHOLARS = {
	headers: [
		{
			name: 'Name',
			inputName: 'Name',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'LastName',
			inputName: 'LastName',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'Email',
			inputName: 'Email',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'PhoneNumber',
			inputName: 'PhoneNumber',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'CI',
			inputName: 'CI',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'Version',
			inputName: 'Version',
			required: true,
			requiredError: function (headerName, rowNumber, columnNumber) {
				return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'PersonalEmail',
			inputName: 'PersonalEmail',
			required: false,
		},
		{
			name: 'CurrentCity',
			inputName: 'CurrentCity',
			required: false,
			validate: function (city) {
				return isCityValid(city);
			},
			validateError: function (headerName, rowNumber, columnNumber) {
				// eslint-disable-next-line max-len
				return `${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
			},
		},
		{
			name: 'University',
			inputName: 'University',
			required: false,
		},
		{
			name: 'Career',
			inputName: 'Career',
			required: false,
		},
		{
			name: 'AcademicDegree',
			inputName: 'AcademicDegree',
			required: false,
		},
	],
};
