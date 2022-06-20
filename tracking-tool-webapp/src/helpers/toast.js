import { toast } from 'react-semantic-toasts';

/**
 * @param {object} props - Properties like size, title, icon, etc.
 * @returns {object} - Toast element.
 */
export function showSuccessToast(props) {
	return toast({
		type: 'success',
		icon: 'check circle',
		animation: 'bounce',
		time: 5000,
		...props,
	});
}

/**
 * @param {object} props - Properties like size, title, icon, etc.
 * @returns {object} - Toast element.
 */
export function showWarningToast(props) {
	return toast({
		type: 'warning',
		icon: 'warning sign',
		animation: 'bounce',
		time: 5000,
		...props,
	});
}

/**
 * @param {object} props - Properties like size, title, icon, etc.
 * @returns {object} - Toast element.
 */
export function showErrorToast(props) {
	return toast({
		type: 'error',
		icon: 'times circle',
		animation: 'bounce',
		time: 5000,
		...props,
	});
}

/**
 * @param {object} props - Properties like size, title, icon, etc.
 * @returns {object} - Toast element.
 */
export function showInformationToast(props) {
	return toast({
		type: 'info',
		animation: 'bounce',
		time: 5000,
		...props,
	});
}
