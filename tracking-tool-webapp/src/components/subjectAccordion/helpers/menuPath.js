const path = '/dashboard/subjects/';

/**
 *
 * @param {object} location the actual path location of the component
 * @param {string} desiredPath the desiredPath to match
 * @returns {boolean} returns if the actual location match with the path desired
 */
export function isTheRouteCorrectWithDesiredPath(location, desiredPath) {
	return location.pathname.includes(desiredPath);
}

/**
 *
 * @param {Array} subjects array of subjects with their respective links
 * @param {string} defaultPath pat by default if not other will be found
 * @returns {string} get the path needed to be redirected
 */
export function getPathRedirected(subjects, defaultPath) {
	return !subjects.length ? defaultPath : `${path}${subjects[0].subjectId}`;
}

/**
 *
 * @param {string} complement the url complement
 * @param {Array} root initial path of the url
 * @returns {string} get the path needed to be redirected
 */
export function getUrl(complement, root = path) {
	return `${root}${complement}`;
}
