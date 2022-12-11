import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { toastConfig } from '../../../utils/toastHelper';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../../redux/actions/adminActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('username', username);
		data.append('password', password);

		axios
			.post('https://api.naroneymeson.ir/admin/login.php', data)
			.then((data) => {
				console.clear();
				console.log(data.data);
				if (data?.data?.status === 'ok') {
					dispatch(setAdmin(data?.data?.data));
					navigate('/admin', { replace: true });
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => console.log(err));
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
							// required
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
							// required
						/>
					</Form.Group>
					<button type="submit" className="nn_btn_primary w-100 fs-3 p-0">
						ورود
					</button>
				</Form>
			</div>
		</>
	);
};

export default Login;
