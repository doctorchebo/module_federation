/**
 * Builds a array of email body to send to users
 *
 * @param {object} values - value to build notification's body
 * @returns {Array} - array of notifications to send
 */
export function buildEmail(values) {
	let emailTargets = [];
	const { notifyTo, eventTypeId } = values;
	const eventType = values.events.find(function (event) {
		if (event.id === eventTypeId) {
			return event.name;
		}
	});

	notifyTo.forEach((user) => {
		emailTargets.push(user.email);
	});

	const email = {
		emailTargets,
		subject: values.title,
		body: values.description.concat(' Event type ', eventType.name),
		ownerId: values.profile.id,
		type: values.type,
		hasTemplate: true,
	};
	return email;
}
