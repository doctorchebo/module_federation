/* istanbul ignore file */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Visibility } from 'semantic-ui-react';
import Navbar from '../navbar/index';

/**
 * Desktop container.
 *
 * @param {*} props - properties.
 * @returns {*} - JSX Element.
 */
function DesktopContainer(props) {
	const [fixed, setFixedMenu] = useState(false);
	const { children } = props;
	return (
		<Container fluid>
			<Visibility
				once={false}
				onBottomPassed={() => setFixedMenu(true)}
				onBottomPassedReverse={() => setFixedMenu(false)}
			>
				<Navbar fixed={fixed} />
			</Visibility>
			{children}
		</Container>
	);
}

DesktopContainer.propTypes = {
	children: PropTypes.any,
};
export default DesktopContainer;
