import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import locale from '../../locale/en.json';

/**
 * @returns {*} -
 */
export default function InnerLoader() {
	const { contentLoader } = locale;

	return (
		<Dimmer active inverted>
			<Loader inverted name='loader'>
				{contentLoader}
			</Loader>
		</Dimmer>
	);
}
