import {
	SET_CONTACT,
	SET_CATEGORIES,
	SET_COLORS,
	SET_SIZES,
	SET_PRODUCTS,
	SET_MESSAGES,
} from '../actionTypes';

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
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			};
		case SET_COLORS:
			return {
				...state,
				colors: action.colors,
			};
		case SET_SIZES:
			return {
				...state,
				sizes: action.sizes,
			};
		case SET_MESSAGES:
			return {
				...state,
				messages: action.messages,
			};
		case SET_PRODUCTS:
			return {
				...state,
				products: action.products,
			};
		default:
			return state;
	}
};

export default mainReducer;
