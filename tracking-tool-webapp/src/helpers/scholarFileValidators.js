import { scholarHeadersFile, MAX_SIZE_FILE, CONFIG_SCHOLARS } from 'helpers/scholarFileParams';
import { FileExtensionType, BAD_FILE_EXTENSION } from 'helpers/fileExtensions';
import { validateSize, validateCsvFile, validateXlsxFile } from 'helpers/fileValidations';

/**
 *
 * @param {object} data file received from the drag and drop component.
 * @returns {object} object with the response of the validation.
 */
export default async function validateScholarFile(data) {
	let response = { isValid: true, messages: [] };
	response = validateSize(data, response, MAX_SIZE_FILE);
	if (response.isValid) {
		const fileArray = data.name.split('.');
		const extension = fileArray[fileArray.length - 1].toLowerCase();
		switch (extension) {
			case FileExtensionType.XLSX:
				response = await validateXlsxFile(data, response, scholarHeadersFile);
				break;
			case FileExtensionType.CSV:
				response = await validateCsvFile(
					data,
					response,
					scholarHeadersFile,
					CONFIG_SCHOLARS
				);
				break;
			default:
				response.isValid = false;
				response.messages.push(`${extension} ${BAD_FILE_EXTENSION}`);
		}
	}
	return response;
}
