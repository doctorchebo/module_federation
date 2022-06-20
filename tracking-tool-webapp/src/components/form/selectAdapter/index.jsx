import React, { ElementType } from 'react';
import { Form } from 'semantic-ui-react';
import { func } from 'prop-types';

/**
 * This component is an Adapter to use Select Component of Semantic UI with useForm custom hook.
 *
 * @param {props} props Properties.
 * @returns {ElementType} Returns an Element Type.
 */
export default function SelectAdapterComponent(props) {
	return (
		<Form.Select
			{...props}
			onChange={(event, data) =>
				props.onChange({
					...event,
					target: { ...event.target, ...data },
				})
			}
		/>
	);
}

SelectAdapterComponent.propTypes = {
	onChange: func,
};
