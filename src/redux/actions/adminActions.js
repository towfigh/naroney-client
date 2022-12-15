import { SET_ADMIN } from '../actionTypes';

export const setAdmin = (admin) => (dispatch) =>
	dispatch({ type: SET_ADMIN, admin });
