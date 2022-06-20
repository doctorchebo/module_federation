import { BreadCrumbsActions } from 'pages/dashboard/components/topMenu/context/type';
export default (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case BreadCrumbsActions.getBreadCrumbs:
			return {
				...state,
				breadCrumbs: payload,
			};
		default:
			return state;
	}
};
