import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Image, Container, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { imageProfile } from 'helpers/Dashboard';
import { FormattedMessage } from 'react-intl';
import { navbarBrand } from '../../../helpers/constants';
import locale from '../../locale/en.json';
import Button from 'components/button';
import './index.css';

/**
 * @param {*} props -
 * @returns {*} -
 */
export default function Navbar(props) {
	const { fixed } = props;
	const { dashboard } = locale;

	const trigger = (
		<span>
			<Image size='mini' src={imageProfile} avatar />
		</span>
	);

	return (
		<Container className='navbar'>
			<Menu
				inverted
				color={fixed ? 'black' : null}
				fixed={fixed ? 'top' : null}
				secondary={!fixed}
			>
				<Container className='navbar' textAlign='center'>
					<Image src={navbarBrand} size='small' />
					{localStorage.getItem('token') == null ? (
						<Menu.Item position='right'>
							<Button as={Link} to='/login' size='large' inverted>
								{<FormattedMessage id='app.navbar.login' />}
							</Button>
						</Menu.Item>
					) : (
						<Menu.Item position='right'>
							<Dropdown pointing='top right' trigger={trigger} icon={null}>
								<Dropdown.Menu>
									<Dropdown.Item as={Link} to='/dashboard'>
										<Icon name='home' />
										{dashboard}
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Item>
					)}
				</Container>
			</Menu>
		</Container>
	);
}

Navbar.propTypes = {
	fixed: PropTypes.any,
};
