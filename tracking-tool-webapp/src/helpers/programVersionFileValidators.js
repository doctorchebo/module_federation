import {
	programVersion,
	stage,
	subject,
	MAX_SIZE_FILE,
	programVersionFileMessages,
} from 'helpers/programVersionFileParams';
import { FileExtensionType } from 'helpers/fileExtensions';
import { validateSize } from 'helpers/fileValidations';

/**
 *
 * @param {object} data file received from the drag and drop component.
 * @returns {object} object with the response of the validation.
 */
export default async function validateProgramVersionFile(data) {
	let response = { isValid: true, messages: [] };
	response = validateSize(data, response, MAX_SIZE_FILE);
	const fileArray = data.name.split('.');
	const extension = fileArray[fileArray.length - 1].toLowerCase();
	if (extension === FileExtensionType.JSON) {
		response = await ValidateJsonStructure(data, response);
	} else {
		response.isValid = false;
		response.messages.push(`${extension} ${programVersionFileMessages.invalidExtension}`);
	}
	return response;
}

/**
 * Validate json structure
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} response response to be modified and returned
 * @returns {object} Response with the results of the validation.
 */
export async function ValidateJsonStructure(data, response) {
	const programV = readFile(data);

	return programV.then((version) => {
		const validVersion = ValidateKeys(version, programVersion);
		if (validVersion.status) {
			response.isValid = response.isValid && validVersion.status;
			if (version.stages.length > 0) {
				response = ValidateJsonSubStructure(version.stages, stage, response);
			}
		} else {
			response.isValid = false;
			response.messages.push(`Invalid structure: 
			${validVersion.notIncluded}, 
			${validVersion.missing}`);
		}
		return response;
	});
}

/**
 * Validate json sub structure
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} objectToCompare object to compare
 * @param {object} response response to be modified and returned
 * @returns {object} Response with the results of the validation.
 */
export function ValidateJsonSubStructure(data, objectToCompare, response) {
	data.forEach((stage) => {
		const validStage = ValidateKeys(stage, objectToCompare);
		if (validStage.status) {
			response.isValid = response.isValid && validStage.status;
			if (stage.subjects.length > 0) {
				response = ValidateJsonSubSubStructure(stage.subjects, subject, response);
			}
		} else {
			response.isValid = false;
			response.messages.push(`Invalid structure: 
			${validStage.notIncluded}, 
			${validStage.missing}`);
		}
	});
	return response;
}

/**
 * Validate hson sub sub structure
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} objectToCompare object to compare
 * @param {object} response response to be modified and returned
 * @returns {object} Response with the results of the validation.
 */
export function ValidateJsonSubSubStructure(data, objectToCompare, response) {
	data.forEach((subject) => {
		const validSubject = ValidateKeys(subject, objectToCompare);
		if (validSubject.status) {
			response.isValid = response.isValid && validSubject.status;
		} else {
			response.isValid = false;
			response.messages.push(`Invalid structure: 
			${validSubject.notIncluded}, 
			${validSubject.missing}`);
		}
	});
	return response;
}

/**
 * @param {object} objectModel Any object model.
 * @param {object} objectToCompare Any object to compare.
 * @returns {object} object validating the keys.
 */
export function ValidateKeys(objectModel, objectToCompare) {
	let modelKeys = Object.keys(objectModel);
	let compareKeys = Object.keys(objectToCompare);
	let data = {};
	data.notIncluded = compareKeys.filter((key) => !modelKeys.includes(key));
	data.missing = modelKeys.filter((key) => !compareKeys.includes(key));
	data.status = !data.notIncluded.length && !data.missing.length;
	return data;
}

/**
 * @param {object} file Any json file.
 * @returns {object} Json Object or an error.
 */
export function readFile(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			return resolve(JSON.parse(reader.result));
		};
		reader.onerror = function () {
			return reject(reader.error);
		};
	});
}

/**
 * @param {string} email email for validate.
 * @returns {boolean} email with valid format.
 */
export function validateEmailFormat(email) {
	const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return email.match(patron);
}
