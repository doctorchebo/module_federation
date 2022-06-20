import {
	candidateHeadersFile,
	MAX_SIZE_FILE,
	candidateFileMessages,
} from 'helpers/candidateFileParams';
import { FileExtensionType } from 'helpers/fileExtensions';
import { validateSize, validateCsvFile } from 'helpers/fileValidations';

/**
 * @param {object} data file received from the drag and drop component.
 * @returns {object} object with the response of the validation.
 */
export default async function validateCandidateFile(data) {
	let response = { isValid: true, messages: [] };
	response = validateSize(data, response, MAX_SIZE_FILE);
	const fileArray = data.name.split('.');
	const extension = fileArray[fileArray.length - 1].toLowerCase();
	switch (extension) {
		case FileExtensionType.CSV:
			response = await validateCsvFile(data, response, candidateHeadersFile);
			break;
		default:
			response.isValid = false;
			response.messages.push(`${extension} ${candidateFileMessages.invalidExtension}`);
	}
	return response;
}
