const { isImage } = require('./../imageHelper');

describe('helpers/imageHelper', () => {
	test('should return true when recibe an image file', () => {
		const image = {
			name: 'picture.jpg',
			path: 'picture.jpg',
			size: 13180,
			type: 'image/jpeg',
		};
		expect(isImage(image)).toBeTruthy();
	});
	test('should return false when recieve a text file', () => {
		const file = {
			name: 'file.txt',
			path: 'file.txt',
			size: 13180,
			type: 'document/txt',
		};
		expect(isImage(file)).toBeFalsy();
	});
});
