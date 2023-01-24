import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getContact, setContact } from '../../../../redux/actions/mainActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';
import { showLogs } from '../../../../app/Rules';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const EditContact = ({ contact }) => {
	const [tel, setTel] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [address, setAddress] = useState('');
	const [insta, setInsta] = useState('');
	const [email, setEmail] = useState('');
	const [subTop, setSubTop] = useState('');
	const [subDown, setSubDown] = useState('');
	const [about1, setAbout1] = useState('');
	const [about2, setAbout2] = useState('');
	const [editMode, setEditMode] = useState(false);

	const dispatch = useDispatch();

	const handleEditContact = (e) => {
		const data = new FormData();
		data.append('tel', tel);
		data.append('phone1', phone1);
		data.append('phone2', phone2);
		data.append('address', address);
		data.append('insta', insta);
		data.append('email', email);
		data.append('subTop', subTop);
		data.append('subDown', subDown);
		data.append('about1', about1);
		data.append('about2', about2);
		data.append('action', 'EDIT');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/contact.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setContact(data?.data?.data));
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
		setTel(contact?.find((i) => i.id === '1')?.value || '');
		setPhone1(contact?.find((i) => i.id === '2')?.value || '');
		setPhone2(contact?.find((i) => i.id === '3')?.value || '');
		setAddress(contact?.find((i) => i.id === '4')?.value || '');
		setInsta(contact?.find((i) => i.id === '5')?.value || '');
		setEmail(contact?.find((i) => i.id === '6')?.value || '');
		setSubTop(contact?.find((i) => i.id === '7')?.value || '');
		setSubDown(contact?.find((i) => i.id === '8')?.value || '');
		setAbout1(contact?.find((i) => i.id === '9')?.value || '');
		setAbout2(contact?.find((i) => i.id === '10')?.value || '');
	}, [contact]);

	useEffect(() => {
		dispatch(getContact());
	}, [dispatch]);

	return (
		<>
			<div className="row m-0">
				<div className="col-12">
					<Form className="form-signin w-100 m-auto row">
						<Form.Group
							className="mb-3 col-12 col-md-6 col-lg-4"
							controlId="formBasicPassword"
						>
							<Form.Label className="">
								{contact?.find((i) => i.id === '1')?.name_persian} :
							</Form.Label>
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

						<Form.Group
							className="mb-3 col-12 col-md-6 col-lg-4"
							controlId="formBasicEmail"
						>
							<Form.Label className="">
								{contact?.find((i) => i.id === '2')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={phone1}
								disabled={!editMode}
								onChange={(e) => setPhone1(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group
							className="mb-3 col-12 col-md-6 col-lg-4"
							controlId="formBasicEmail"
						>
							<Form.Label className="">
								{contact?.find((i) => i.id === '3')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={phone2}
								disabled={!editMode}
								onChange={(e) => setPhone2(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="">
								{contact?.find((i) => i.id === '4')?.name_persian} :
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={address}
								disabled={!editMode}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group
							className="mb-3 col-12 col-md-6"
							controlId="formBasicEmail"
						>
							<Form.Label className="">
								{contact?.find((i) => i.id === '5')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={insta}
								disabled={!editMode}
								onChange={(e) => setInsta(e.target.value)}
								required
								dir="ltr"
							/>
						</Form.Group>

						<Form.Group
							className="mb-3 col-12 col-md-6"
							controlId="formBasicEmail"
						>
							<Form.Label className="">
								{contact?.find((i) => i.id === '6')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={email}
								disabled={!editMode}
								onChange={(e) => setEmail(e.target.value)}
								required
								dir="ltr"
							/>
						</Form.Group>
						<Form.Group className="mb-3 col-12" controlId="formBasicEmail">
							<Form.Label className="">
								{contact?.find((i) => i.id === '7')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={subTop}
								disabled={!editMode}
								onChange={(e) => setSubTop(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3 col-12" controlId="formBasicEmail">
							<Form.Label className="">
								{contact?.find((i) => i.id === '8')?.name_persian} :
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								autoComplete="false"
								value={subDown}
								disabled={!editMode}
								onChange={(e) => setSubDown(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="">
								{contact?.find((i) => i.id === '9')?.name_persian} :
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={about1}
								disabled={!editMode}
								onChange={(e) => setAbout1(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="">
								{contact?.find((i) => i.id === '10')?.name_persian} :
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={about2}
								disabled={!editMode}
								onChange={(e) => setAbout2(e.target.value)}
								required
							/>
						</Form.Group>

						{editMode ? (
							<>
								<button
									type="button"
									onClick={(e) => handleEditContact(e)}
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
	const { main } = state;
	return { contact: main?.contact };
}

export default connect(mapStateToProps)(EditContact);
