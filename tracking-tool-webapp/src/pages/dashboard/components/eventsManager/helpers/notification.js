/**
 * Builds a array of notification body to send to users
 *
 * @param {object} values - value to build notification's body
 * @returns {Array} - array of notifications to send
 */
export function buildNotification(values) {
	return values.notifyTo.map((user) => {
		return {
			userId: user.id,
			title: values.title,
			description: values.description,
			type: values.type,
			isRead: false,
		};
	});
}
