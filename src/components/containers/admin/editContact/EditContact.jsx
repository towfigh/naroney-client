import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { setAdmin } from '../../../../redux/actions/mainActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';

const EditContact = ({ contact }) => {
	const [tel, setTel] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [address, setAddress] = useState('');
	const [insta, setInsta] = useState('');
	const [email, setEmail] = useState('');
	const [editMode, setEditMode] = useState(false);

	// const dispatch = useDispatch();

	const handleEditContact = (e) => {
		const data = new FormData();
		data.append('tel', tel);
		data.append('phone1', phone1);
		data.append('phone2', phone2);
		data.append('address', address);
		data.append('insta', insta);
		data.append('email', email);
		data.append('date', getDate());

		axios
			.post('https://api.naroneymeson.ir/admin/editContact.php', data)
			.then((data) => {
				// console.clear();
				console.log(data.data);
				if (data?.data?.status === 'ok') {
					// dispatch(setAdmin(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
					setEditMode(false);
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		setTel(contact?.find((i) => i.id === '1')?.value || '');
		setPhone1(contact?.find((i) => i.id === '2')?.value || '');
		setPhone2(contact?.find((i) => i.id === '3')?.value || '');
		setAddress(contact?.find((i) => i.id === '4')?.value || '');
		setInsta(contact?.find((i) => i.id === '5')?.value || '');
		setEmail(contact?.find((i) => i.id === '6')?.value || '');
	}, [contact]);
	return (
		<>
			<div className="row m-0">
				<div className="col-12 col-md-6 col-lg-4">
					<Form className="form-signin w-100 m-auto">
						<Form.Group className="mb-3" controlId="formBasicPassword">
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

						<Form.Group className="mb-3" controlId="formBasicEmail">
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

						<Form.Group className="mb-3" controlId="formBasicEmail">
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

						<Form.Group className="mb-3" controlId="formBasicEmail">
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

						<Form.Group className="mb-3" controlId="formBasicEmail">
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
