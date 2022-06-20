import LoggerService from 'services/LoggerService';

/**
 * @param {object} props - Search service
 */
function onSearchRequest(props) {
	const token = localStorage.getItem('token');
	const { service, actionType, params, dispatch } = props;
	service
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: actionType.load,
				payload: response,
			});
		})
		.catch((err) => {
			dispatch({ type: actionType.Error, payload: err.message });
			LoggerService.error(err);
		});
}

export default onSearchRequest;
