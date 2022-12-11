import { SET_ADMIN } from '../actionTypes';

export const setAdmin = (admin) => (dispatch) =>
	dispatch({ type: SET_ADMIN, admin });

// export const setHavePlan = havePlans => dispatch => dispatch({ type: 'SET_HAVE_PLAN', havePlans });
