const mbConvertedInBytes = 1000000;
/**
 * Will validate if the size is minor than the defined
 *
 * @param {*} actualFileSize actual File Size
 * @param {*} maximunMbSize maximun size defined
 * @returns {boolean} returns if the file size is minor
 */
export function validateFileSize(actualFileSize, maximunMbSize) {
	if (actualFileSize <= maximunMbSize * mbConvertedInBytes) {
		return true;
	}
	return false;
}
