import { CLEAR_LOADING, SET_LOADING } from '../actionTypes';

const initialState = {
	isLoading: false,
};

const loaderReducer = (state = initialState, action) => {
	const { type } = action;

	switch (type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CLEAR_LOADING:
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default loaderReducer;
