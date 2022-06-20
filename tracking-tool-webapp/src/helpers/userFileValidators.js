import { userHeadersFile, MAX_SIZE_FILE, userFileMessages } from 'helpers/userFileParams';
import { FileExtensionType } from 'helpers/fileExtensions';
import { validateSize, validateCsvFile, validateXlsxFile } from 'helpers/fileValidations';

/**
 *
 * @param {object} data file received from the drag and drop component.
 * @returns {object} object with the response of the validation.
 */
export default async function validateUserFile(data) {
	let response = { isValid: true, messages: [] };
	response = validateSize(data, response, MAX_SIZE_FILE);
	const fileArray = data.name.split('.');
	const extension = fileArray[fileArray.length - 1].toLowerCase();
	switch (extension) {
		case FileExtensionType.XLSX:
			response = await validateXlsxFile(data, response, userHeadersFile);
			break;
		case FileExtensionType.CSV:
			response = await validateCsvFile(data, response, userHeadersFile);
			break;
		default:
			response.isValid = false;
			response.messages.push(`${extension} ${userFileMessages.invalidExtension}`);
	}
	return response;
}
