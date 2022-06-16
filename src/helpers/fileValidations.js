import ExcelJS from 'exceljs';
import { Readable } from 'stream';
import CSVFileValidator from 'csv-file-validator';
import LoggerService from 'services/LoggerService';
import ValidateJsonStructure from 'helpers/programVersionFileValidators';

/**
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} response response to be modified and returned
 * @param {number} maxSize maximum size for the file.
 * @returns {object} Response with the results of the validation.
 */
export function validateSize(data, response, maxSize) {
	const size = data.size;
	if (size > toBytes(maxSize)) {
		response.isValid = false;
		response.messages.push(
			`The size of the file is greater than the maximum supported (${maxSize}Mb)`
		);
	}
	return response;
}

/**
 *
 * @param {number} value max size file value in mb received from configurations;
 * @returns {number} max size file value in bytes
 */
function toBytes(value) {
	return value * 1024 * 1024;
}

/**
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} response response to be modified and returned
 * @param {Array} headers headers columns
 * @param {Array} config if there a parameter this will be used to instance the csv-file-validator
 * @returns {object} Response with the results of the validation.
 */
export async function validateCsvFile(data, response, headers, config = null) {
	const workbook = new ExcelJS.Workbook();
	const worksheet = await csvToExcel(data, workbook);
	response = validateHeaders(headers, response, worksheet);
	if (config && response.isValid) {
		await CSVFileValidator(data, config)
			.then((csvData) => {
				if (csvData.inValidMessages.length > 0) {
					response.isValid = false;
					response.messages.push(csvData.inValidMessages.toString().split(','));
				} else {
					response.isValid = true;
				}
			})
			.catch((err) => {
				LoggerService.error(err.toString());
			});
	}

	return response;
}

/**
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} response response to be modified and returned
 * @returns {object} Response with the results of the validation.
 */
export async function validateJsonFile(data, response) {
	response = await ValidateJsonStructure(data, response);
	return response;
}

/**
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} response response to be modified and returned
 * @param {Array} headers array of headers
 * @returns {object} Response with the results of the validation.
 */
export async function validateXlsxFile(data, response, headers) {
	const workbook = new ExcelJS.Workbook();
	const loadWorkbook = await workbook.xlsx.load(data);
	const worksheet = loadWorkbook.worksheets[0];
	response = validateHeaders(headers, response, worksheet);
	return response;
}
/**
 *
 * @param {object} data file received from the drag and drop component
 * @param {object} workbook workbook object created with ExcelJS
 * @returns {object} Excel worksheet with the headers to be validated
 */
export async function csvToExcel(data, workbook) {
	const stream = await toStream(data);
	const worksheet = await workbook.csv.read(stream);
	return worksheet;
}

/**
 *
 * @param {object} data file received from the drag and drop component.
 * @returns {object} promise with file data in a stream.
 */
function toStream(data) {
	const reader = new FileReader();
	const stream = new Readable();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			const result = event.target.result;
			stream.push(result);
			stream.push(null);
			resolve(stream);
		};
		reader.readAsText(data);
	});
}

/**
 *
 * @param {object} headers header objects with the required header for the file.
 * @param {object} response response to be modified and returned.
 * @param {object} worksheet worksheet object received from exceljs.
 * @returns {object} Response with the results of the validation.
 */
function validateHeaders(headers, response, worksheet) {
	const headerValues = headers.map(({ value }) => value);
	try {
		const row = worksheet.getRow(1);
		const values = row.values;
		const newValues = values.map((value) => value.toLowerCase());
		const isValid = headers.every((header) => newValues.includes(header.value.toLowerCase()));
		if (!isValid) {
			response.isValid = false;
			response.messages.push(`The required structure for the file is: ${headerValues}`);
		}
	} catch (exception) {
		response.isValid = false;
		response.messages.push(`The required structure for the file is: ${headerValues}`);
	}
	return response;
}
