/**
 * Converts programs to option to use in a select component
 *
 * @param {Array} programs - array of programs
 * @returns {Array} - programs converted on option structure
 */
export function convertProgramsToOptions(programs) {
	return programs.map(({ id, name }) => ({
		key: name,
		text: name,
		value: id,
	}));
}
