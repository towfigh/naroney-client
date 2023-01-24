import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { toastConfig } from '../../../utils/toastHelper';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../../redux/actions/adminActions';
import { Link, useNavigate } from 'react-router-dom';
import {
	setCategories,
	setColors,
	setContact,
	setMessages,
	setProducts,
	setSizes,
} from '../../../redux/actions/mainActions';
import { showLogs } from '../../../app/Rules';
import { clearLoading, setLoading } from '../../../redux/actions/loaderAction';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [inRequest, setInRequest] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		setInRequest(true);
		const data = new FormData();
		data.append('username', username);
		data.append('password', password);
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/login.php', data)
			.then((data) => {
				setInRequest(false);
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setAdmin(data?.data?.data?.user));
					dispatch(setContact(data?.data?.data?.contact));
					dispatch(setCategories(data?.data?.data?.categories));
					dispatch(setColors(data?.data?.data?.colors));
					dispatch(setSizes(data?.data?.data?.sizes));
					dispatch(setProducts(data?.data?.data?.products));
					dispatch(setMessages(data?.data?.data?.messages));
					navigate('/admin', { replace: true });
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => {
				dispatch(clearLoading());
				console.log(err);
			});
	};
	return (
		<>
			<div className="form_holder">
				<Form
					className="form-signin w-100 m-auto"
					onSubmit={(e) => handleLogin(e)}
				>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label className="">نام کاربری :</Form.Label>
						<Form.Control
							type="text"
							placeholder=""
							autoComplete="false"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label className="">رمز عبور :</Form.Label>
						<Form.Control
							type="password"
							placeholder=""
							autoComplete="false"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Form.Group>

					<button
						type="submit"
						className="nn_btn_primary w-100 fs-3 p-0"
						disabled={inRequest}
					>
						{inRequest ? 'لطفا منتظر بمانید ...' : 'ورود'}
					</button>

					<Link to="/" className="text-center m-auto mt-3">
						<h6 className="text-center m-auto w-100 mt-3">صفحه اصلی سایت</h6>
					</Link>
				</Form>
			</div>
		</>
	);
};

export default Login;
