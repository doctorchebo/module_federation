import validateScholarFiles from '../scholarFileValidators';
import ExcelJS from 'exceljs';
import { scholarFileMessages } from 'helpers/scholarFileParams';

describe('helpers/scholarFileValidators', () => {
	describe('validationsScholarFiles', () => {
		test('validateScholarFiles should return a valid response with a valid Xlsx', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'PhoneNumber',
				'CI',
				'Version',
				'PersonalEmail',
				'CurrentCity',
				'University',
				'Career',
				'AcademicDegree',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateScholarFiles(data)).toStrictEqual({ isValid: true, messages: [] });
		});
		test('validateScholarsFiles should return invalid response with invalid Xlsx', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'Last Name',
				'Email',
				'Role',
				'CI',
				'Issued',
				'Phone Number',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateScholarFiles(data)).toStrictEqual({
				isValid: false,
				messages: [scholarFileMessages.invalidHeaders],
			});
		});
		test('validateScholarFile should return invalid size', async () => {
			const workbook = new ExcelJS.Workbook();
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			data.size = 8 * 1024 * 1024;
			expect(await validateScholarFiles(data)).toStrictEqual({
				isValid: false,
				messages: [scholarFileMessages.invalidSize],
			});
		});
		test('validateScholarFile should return invalid response bad header Name', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = ['Nazme'];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateScholarFiles(data)).toStrictEqual({
				isValid: false,
				messages: [scholarFileMessages.invalidHeaders],
			});
		});

		test('validateScholarFile should return invalid extension with json.file', async () => {
			const workbook = new ExcelJS.Workbook();
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.json';
			expect(await validateScholarFiles(data)).toStrictEqual({
				isValid: false,
				messages: [`json ${scholarFileMessages.invalidExtension}`],
			});
		});

		test('validateScholarFile should return a valid response with CSV file', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'PhoneNumber',
				'CI',
				'Version',
				'PersonalEmail',
				'CurrentCity',
				'University',
				'Career',
				'AcademicDegree',
			];
			const buffer = await workbook.csv.writeBuffer();
			const data = new File([buffer], 'excel.csv');
			const result = await validateScholarFiles(data);

			expect(result).toStrictEqual({
				isValid: true,
				messages: [],
			});
		});

		test('validateScholarFile should return a invalid response with CSV file', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'PhoneNumber',
				'CI',
				'Version',
				'PersonalEmail',
				'CurrentCity',
				'University',
				'Career',
				'AcademicDegree',
			];
			worksheet.getRow(2).values = [
				'',
				'',
				'',
				'',
				'',
				'',
				'PersonalEmail',
				'CurrentCity',
				'University',
				'Career',
				'AcademicDegree',
			];
			const buffer = await workbook.csv.writeBuffer();
			const data = new File([buffer], 'excel.csv');
			const result = await validateScholarFiles(data);

			expect(result.isValid).toBeFalsy();
			expect(result.messages[0]).not.toEqual([]);
		});
	});
});
