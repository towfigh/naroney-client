import { CHANGE_THEME_TO_DARK, CHANGE_THEME_TO_LIGHT } from '../actionTypes';

const initialState = {
	theme: 'theme-dark',
};

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_THEME_TO_DARK:
			return { theme: 'theme-dark' };
		case CHANGE_THEME_TO_LIGHT:
			return { theme: 'theme-light' };
		default:
			return state;
	}
};

export default themeReducer;
