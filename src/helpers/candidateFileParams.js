/* eslint-disable max-len */
export const candidateHeadersFile = [
	{ column: 1, value: 'Email Address' },
	{ column: 2, value: 'Ingresa tu nombre completo' },
	{ column: 3, value: 'Selecciona tu país de residencia' },
	{ column: 4, value: 'Ingresa tu ciudad de residencia' },
	{ column: 5, value: 'Ingresa tu fecha de nacimiento' },
	{ column: 6, value: 'Ingresa tu número de documento de identidad' },
	{ column: 7, value: 'Ingresa tu número de celular' },
	{ column: 8, value: 'Selecciona la carrera que estudiaste o estas estudiando' },
	{ column: 9, value: 'Ingresa el nombre de tu entidad educativa' },
	{ column: 10, value: 'Adjunta tu curriculum vitae en pdf (max 2 MB)' },
];

export const MAX_SIZE_FILE = 5; //size in Mb.

export const candidateFileMessages = {
	invalidExtension: 'is not a valid file extension',
	invalidHeaders: 'The required structure for the file is:',
	invalidSize: 'The size of the file is greater than the maximum supported (5Mb)',
};
