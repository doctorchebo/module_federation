/**
 * Will validate if the size is minor than the defined
 *
 * @param {*} validExtensions actual valid types
 * @param {*} fileName file name
 * @param {*} fileType file type
 * @returns {boolean} returns if the file contains the correct extension
 */
export function validateFileExtension(validExtensions, fileName, fileType) {
	let extensionsList = validExtensions.split(',');
	const extension = '.' + fileName.split('.').pop();

	if (
		extensionsList.includes(extension) ||
		validateType(validExtensions, fileType) ||
		validExtensions === '*'
	) {
		return true;
	}
	return false;
}

/**
 * Will validate if the type is correct
 *
 * @param {*} validExtensions actual valid types
 * @param {*} fileType file type
 * @returns {boolean} returns if the file contains the correct type
 */
function validateType(validExtensions, fileType) {
	const types = fileType.split('/');

	if (validExtensions.includes(types[0]) || validExtensions.includes(types[1])) {
		return true;
	}
	return false;
}
