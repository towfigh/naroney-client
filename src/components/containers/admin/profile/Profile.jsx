import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setAdmin } from '../../../../redux/actions/adminActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';
import { showLogs } from '../../../../app/Rules';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const Profile = ({ user }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [tel, setTel] = useState('');
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();

	const handleEditProfile = (e) => {
		const data = new FormData();
		data.append('username', username);
		data.append('password', password);
		data.append('email', email);
		data.append('tel', tel);
		data.append('action', 'EDIT');
		data.append('date', getDate());
		data.append('userId', user?.id);
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/profile.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setAdmin(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
					setEditMode(false);
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => {
				dispatch(clearLoading());
				console.log(err);
			});
	};

	useEffect(() => {
		setUsername(user?.username || '');
		setPassword(user?.password || '');
		setEmail(user?.email || '');
		setTel(user?.tel || '');
	}, [user]);

	useEffect(() => {
		dispatch(getProfile(user?.id));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className="row m-0">
				<div className="col-12 col-sm-6 col-xl-4">
					<Form className="form-signin w-100 m-auto">
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label className="">نام کاربری :</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={username}
								disabled={!editMode}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label className="">رمز عبور :</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={password}
								disabled={!editMode}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="">ایمیل :</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={email}
								disabled={!editMode}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicTel">
							<Form.Label className="">تلفن :</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={tel}
								disabled={!editMode}
								onChange={(e) => setTel(e.target.value)}
								required
							/>
						</Form.Group>
						{editMode ? (
							<>
								<button
									type="button"
									onClick={(e) => handleEditProfile(e)}
									className="nn_btn_primary w-100 fs-5 p-0"
								>
									ذخیره
								</button>
								<button
									type="button"
									onClick={() => setEditMode(false)}
									className="nn_btn_secondary w-100 fs-5 p-0 mt-3"
								>
									انصراف
								</button>
							</>
						) : (
							<>
								<button
									type="button"
									onClick={() => setEditMode(true)}
									className="nn_btn_primary w-100 fs-5 p-0"
								>
									ویرایش
								</button>
							</>
						)}
					</Form>
				</div>
			</div>
		</>
	);
};

function mapStateToProps(state) {
	const { admin } = state;
	return { user: admin?.user };
}

export default connect(mapStateToProps)(Profile);
