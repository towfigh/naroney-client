import axios from 'axios';
import { showLogs } from '../../app/Rules';
import { getDate } from '../../utils/getDate';
import { store } from '../../app/store';
import { SET_ADMIN } from '../actionTypes';

export const setAdmin = (admin) => (dispatch) =>
	dispatch({ type: SET_ADMIN, admin });

export const getProfile = () => (dispatch) => {
	const userId = store?.getState()?.admin?.user?.id;
	const data = new FormData();
	data.append('action', 'BYID');
	data.append('id', userId);
	data.append('date', getDate());

	axios
		.post('https://api.naroneymeson.ir/admin/profile.php', data)
		.then((data) => {
			if (showLogs) {
				console.log(data.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_ADMIN, admin: data?.data?.data });
			}
		})
		.catch((err) => console.log(err));
};
