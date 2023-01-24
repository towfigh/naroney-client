import axios from 'axios';
import { showLogs } from '../../app/Rules';
import { getDate } from '../../utils/getDate';
import {
	SET_CONTACT,
	SET_COLORS,
	SET_CATEGORIES,
	SET_SIZES,
	SET_PRODUCTS,
	SET_MESSAGES,
} from '../actionTypes';
import { clearLoading, setLoading } from './loaderAction';

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
export const setMessages = (messages) => (dispatch) =>
	dispatch({ type: SET_MESSAGES, messages });

export const getAllFeed = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/feed.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_SIZES, sizes: data?.data?.data?.sizes });
				dispatch({ type: SET_COLORS, colors: data?.data?.data?.colors });
				dispatch({
					type: SET_CATEGORIES,
					categories: data?.data?.data?.categories,
				});
				dispatch({ type: SET_CONTACT, contact: data?.data?.data?.contact });
				dispatch({ type: SET_PRODUCTS, products: data?.data?.data?.products });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getAllSizes = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/sizes.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_SIZES, sizes: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getAllColors = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/colors.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_COLORS, colors: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getAllCategories = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/categories.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_CATEGORIES, categories: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getAllProducts = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());
	axios
		.post('https://api.naroneymeson.ir/admin/products.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_PRODUCTS, products: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getAllMesssages = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/message.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_MESSAGES, messages: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const seenMesssage = (id) => (dispatch) => {
	const data = new FormData();
	data.append('action', 'SEEN');
	data.append('id', id);
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/message.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const deleteMesssage = (id) => (dispatch) => {
	const data = new FormData();
	data.append('action', 'DELETE');
	data.append('id', id);
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/message.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_MESSAGES, messages: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};

export const getContact = () => (dispatch) => {
	const data = new FormData();
	data.append('action', 'ALL');
	data.append('date', getDate());
	dispatch(setLoading());

	axios
		.post('https://api.naroneymeson.ir/admin/contact.php', data)
		.then((data) => {
			dispatch(clearLoading());
			if (showLogs) {
				console.log(data?.data);
			}
			if (data?.data?.status === 'ok') {
				dispatch({ type: SET_CONTACT, contact: data?.data?.data });
			}
		})
		.catch((err) => {
			dispatch(clearLoading());
			console.log(err);
		});
};
