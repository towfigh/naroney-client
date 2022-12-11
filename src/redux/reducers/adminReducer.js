import { SET_ADMIN } from '../actionTypes';

const initialState = {
	user: null,
};

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ADMIN:
			return {
				...state,
				user: action.admin,
			};
		default:
			return state;
	}
};

export default themeReducer;
