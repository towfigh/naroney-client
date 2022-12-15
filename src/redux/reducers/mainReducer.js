import { SET_CONTACT } from '../actionTypes';

const initialState = {
	contact: null,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CONTACT:
			return {
				...state,
				contact: action.contact,
			};
		default:
			return state;
	}
};

export default mainReducer;
