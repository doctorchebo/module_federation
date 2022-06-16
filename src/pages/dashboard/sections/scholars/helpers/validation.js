import EvaluationNotApproved from 'exceptions/EvaluationNotApproved';
import Forbidden from 'exceptions/Forbidden';
import locale from '../locale/en.json';

/**
 * Validates if all approvals are checked
 *
 * @param {Array} approvals Approvals list
 * @returns {boolean} Bool for validation
 */
export function validateApprovals(approvals) {
	const unchecked = approvals.filter((item) => item.checked === false);
	if (unchecked.length > 0) {
		throw new EvaluationNotApproved(locale.evaluationNotApproved);
	}
	return true;
}

/**
 * Validate current user role to be authorized
 *
 * @param {string} role Name of current role
 * @returns {boolean} Bool of validation
 */
export function validateCloseEvaluationRole(role) {
	if (!(role === 'Administrator' || role === 'Coordinator')) {
		throw new Forbidden(locale.forbidenRole);
	}
	return true;
}

/**
 * VAlidates role to close evaluation
 *
 * @param {string} role Role name
 * @returns {boolean} Bool of validation
 */
export function validateCloseEvaluationRolesBool(role) {
	return role === 'Administrator' || role === 'Coordinator';
}
