export const Report = {
	success: { name: 'check circle outline', color: 'green' },
	warning: { name: 'warning sign', color: 'yellow' },
	failed: { name: 'times circle outline', color: 'red' },
};

/**
 * Choose an icon according to a sent flag
 *
 * @param {string} flag - flag to choose
 * @returns {string} - type of icon
 */
export function iconByFlag(flag) {
	switch (flag) {
		default:
			return 'calendar outline';
	}
}
