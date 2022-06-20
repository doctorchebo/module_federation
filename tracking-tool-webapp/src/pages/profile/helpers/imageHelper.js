/**
 * @param {object} image to validate
 * @returns {boolean} - boolean
 */
export function isImage(image) {
	return image.type.startsWith('image/');
}

/**
 * @param {Function} onLoad to make true or false the loading
 */
export function reloadImage(onLoad) {
	onLoad(true);
	setTimeout(() => {
		onLoad(false);
	}, 6000);
}

/**
 * @param {string} canvas - The canvas reference of image
 * @param {string} image - the base 64 of image
 * @param {string} crop - the pixels of crop image
 */
export function convertBase64ToCanvasRef(canvas, image, crop) {
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const ctx = canvas.getContext('2d');
	const pixelRatio = window.devicePixelRatio;

	canvas.width = crop.width * pixelRatio * scaleX;
	canvas.height = crop.height * pixelRatio * scaleY;

	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	ctx.imageSmoothingQuality = 'high';

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY
	);
}
