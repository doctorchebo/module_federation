import validateUserFile from '../userFileValidators';
import ExcelJS from 'exceljs';
import { userFileMessages } from 'helpers/userFileParams';

describe('helpers/userFileValidators', () => {
	const invalidSize = 'The size of the file is greater than the maximum supported (5Mb)';
	const invalidHeaders =
		// eslint-disable-next-line max-len
		'The required structure for the file is: Name,LastName,Email,CI,Issued,PhoneNumber,CurrentCity,Role';
	describe('validateUserFiles', () => {
		test('validateUserFiles should return a valid response with a valid Xlsx', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'CI',
				'Issued',
				'PhoneNumber',
				'Currentcity',
				'Role',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateUserFile(data)).toStrictEqual({ isValid: true, messages: [] });
		});
		test('validateUserFiles should return invalid response with an invalid Xlsx', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'Last Name',
				'Email',
				'CI',
				'Issued',
				'Phone Number',
				'Role',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateUserFile(data)).toStrictEqual({
				isValid: false,
				messages: [invalidHeaders],
			});
		});
		test('validateUserFiles should return invalid response with an error', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'Last Name',
				'Email',
				'CI',
				'Issued',
				'Role',
				123,
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			expect(await validateUserFile(data)).toStrictEqual({
				isValid: false,
				messages: [invalidHeaders],
			});
		});
		test('validateUserFiles should return invalid response with an invalid size', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'CI',
				'Issued',
				'PhoneNumber',
				'Currentcity',
				'Role',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xlsx';
			data.size = 6 * 1024 * 1024;
			expect(await validateUserFile(data)).toStrictEqual({
				isValid: false,
				messages: [invalidSize],
			});
		});
		test('validateUserFiles should return invalid response with an invalid type', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'CI',
				'Issued',
				'PhoneNumber',
				'Currentcity',
				'Role',
			];
			const data = await workbook.xlsx.writeBuffer();
			data.name = 'excel.xls';
			expect(await validateUserFile(data)).toStrictEqual({
				isValid: false,
				messages: [`xls ${userFileMessages.invalidExtension}`],
			});
		});
		test('validateUserFiles should return a valid response with a valid csv', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'CI',
				'Issued',
				'PhoneNumber',
				'Currentcity',
				'Role',
			];
			const data = await workbook.csv.writeBuffer();
			const file = new File([data], 'excel.csv');
			expect(await validateUserFile(file)).toStrictEqual({ isValid: true, messages: [] });
		});
		test('validateUserFiles should return invalid response with a invalid csv', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('sheet1');
			worksheet.getRow(1).values = [
				'Name',
				'LastName',
				'Email',
				'CI',
				'Issued',
				'PhoneNumber',
				'Role',
			];
			const data = await workbook.csv.writeBuffer();
			const file = new File([data], 'excel.csv');
			expect(await validateUserFile(file)).toStrictEqual({
				isValid: false,
				messages: [invalidHeaders],
			});
		});
	});
});
