import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image, Feed } from 'semantic-ui-react';
import { Logout } from 'helpers/Dashboard';
import ConfirmModal from 'components/confirmModal';
import { Link } from 'react-router-dom';
import { useProfileContext } from 'pages/profile/context';
import { Loader } from 'semantic-ui-react';
import './index.css';
/**
 * @param {object} props -
 * @returns {React.Component} -
 */
export default function UserDetails(props) {
	const { profile, role, onLogout } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [state, actions] = useProfileContext();

	useEffect(() => {
		actions.onGetUserImage();
	}, []);

	const trigger = (
		<div className={'user-avatar'}>
			{state.loading ? (
				<Loader active inline />
			) : (
				<Feed>
					<Feed.Event>
						<Feed.Label>
							<Image src={state.userImage.providerImageKey} />
						</Feed.Label>
						<Feed.Content>
							<Feed.Summary>
								{profile.firstName} {profile.lastName}
								<Feed.Date>{role}</Feed.Date>
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>
				</Feed>
			)}
		</div>
	);
	return (
		<>
			<Menu.Item>
				<Dropdown pointing='top right' trigger={trigger} icon={null}>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setIsOpen(true)} className='drop-logout'>
							{Logout}
						</Dropdown.Item>
						<Dropdown.Item as={Link} to='/dashboard/profile'>
							{'Profile'}
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
			<ConfirmModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				action={onLogout}
				header={'Logout confirmation'}
				content={'Are you sure you want to leave this session?'}
				closeSession={true}
			/>
		</>
	);
}

UserDetails.propTypes = {
	profile: PropTypes.object,
	role: PropTypes.string,
	onLogout: PropTypes.any,
};

UserDetails.defaultProps = {
	profile: {
		role: '',
		name: '',
	},
};
