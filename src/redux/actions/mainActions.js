import { SET_CONTACT } from '../actionTypes';

export const setContact = (contact) => (dispatch) =>
	dispatch({ type: SET_CONTACT, contact });
