import mergeSort from 'helpers/sort';
import { decodeToken } from 'helpers/tokenDecoder';
import locale from '../locale/en.json';
const all = {
	key: locale.any.value,
	text: locale.any.name,
	value: locale.any.value,
};

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} eventTypes This is an array of event types.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function eventTypesToOptions(eventTypes) {
	const optionEventTypes = eventTypes.map(({ id, name }) => ({
		key: id,
		text: name,
		value: id,
	}));

	optionEventTypes.push(all);

	return optionEventTypes;
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} stages This is an array of stages.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function stagesToOptions(stages) {
	const optionStages = stages.map(({ id, name, subjects }) => ({
		key: id,
		text: name,
		value: id,
		subjects: subjects.map(({ id, name }) => ({
			key: id,
			text: name,
			value: id,
		})),
	}));

	optionStages.push(all);

	return optionStages;
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} statusTypes This is an array of status types.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function statusTypesToOptions(statusTypes) {
	if (statusTypes) {
		return statusTypes.map(({ id, name }) => ({
			key: id,
			text: name,
			value: id,
		}));
	}
	return [];
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} users This is an array of users.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function notificationUsersToOptions(users) {
	const { sub } = decodeToken();
	const filteredUsers = users.filter((user) => user.id !== sub);
	return filteredUsers.map(({ id, firstName, lastName, email }) => ({
		key: id,
		text: `${firstName} ${lastName}`,
		value: id,
		name: id,
	}));
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} authors This is an array of authors.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function authorsToOptions(authors) {
	if (authors) {
		const optionAuthors = authors.map(({ id, firstName, lastName }) => ({
			key: id,
			text: `${firstName} ${lastName}`,
			value: id,
		}));

		optionAuthors.push(all);

		return optionAuthors;
	}
	return [];
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} currentUsers This is an array of current users.
 * @param {Array} matchedUsers This is an array of matched users.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function updateUsersToNotify(currentUsers, matchedUsers) {
	const usersToNotify = currentUsers.concat(
		matchedUsers.filter(({ id }) => !currentUsers.find((item) => item.id === id))
	);
	return mergeSort('firstName', usersToNotify);
}
/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} currentUsers This is an array of current users.
 * @param {Array} selectedUsers This is an array of selected users.
 * @returns {Array} Returns a new array with only the Selected users to show in options.
 */
export function getSelectedUsersToNotify(currentUsers, selectedUsers) {
	const usersToNotify = currentUsers.filter((user) =>
		selectedUsers.some((selectedUser) => selectedUser === user.id)
	);
	return mergeSort('firstName', usersToNotify);
}

/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} stages This is an array of Stages.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function subjectToOptions(stages = []) {
	let allStages = [];
	stages.forEach((stage) => {
		stage.subjects.forEach((subject) => allStages.push(subject.name));
	});
	allStages = allStages.filter((subject, index) => allStages.indexOf(subject) === index);
	allStages = allStages.map((subject) => ({ key: subject, text: subject, value: subject }));
	allStages.push(all);
	return allStages;
}
