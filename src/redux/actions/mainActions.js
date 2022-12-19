import axios from 'axios';
import { showLogs } from '../../app/Rules';
import { getDate } from '../../utils/getDate';
import {
	SET_CONTACT,
	SET_COLORS,
	SET_CATEGORIES,
	SET_SIZES,
	SET_PRODUCTS,
} from '../actionTypes';

export const setContact = (contact) => (dispatch) =>
	dispatch({ type: SET_CONTACT, contact });
export const setCategories = (categories) => (dispatch) =>
	dispatch({ type: SET_CATEGORIES, categories });
export const setColors = (colors) => (dispatch) =>
	dispatch({ type: SET_COLORS, colors });
export const setSizes = (sizes) => (dispatch) =>
	dispatch({ type: SET_SIZES, sizes });
export const setProducts = (products) => (dispatch) =>
	dispatch({ type: SET_PRODUCTS, products });

export const getAllSizes = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());

	axios
		.post('https://api.naroneymeson.ir/admin/sizes.php', data)
		.then((data) => {
			if (showLogs) {
				console.log(data.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_SIZES, sizes: data?.data?.data });
			}
		})
		.catch((err) => console.log(err));
};

export const getAllColors = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());

	axios
		.post('https://api.naroneymeson.ir/admin/colors.php', data)
		.then((data) => {
			if (showLogs) {
				console.log(data.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_COLORS, colors: data?.data?.data });
			}
		})
		.catch((err) => console.log(err));
};

export const getAllCategories = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());

	axios
		.post('https://api.naroneymeson.ir/admin/categories.php', data)
		.then((data) => {
			if (showLogs) {
				console.log(data.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_CATEGORIES, categories: data?.data?.data });
			}
		})
		.catch((err) => console.log(err));
};

export const getContact = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());

	axios
		.post('https://api.naroneymeson.ir/admin/contact.php', data)
		.then((data) => {
			if (showLogs) {
				console.log(data.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_CONTACT, contact: data?.data?.data });
			}
		})
		.catch((err) => console.log(err));
};
