import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	FaInstagram,
	FaRegEnvelope,
	FaMobileAlt,
	FaPhone,
} from 'react-icons/fa';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLogs } from '../../../app/Rules';
import { clearLoading, setLoading } from '../../../redux/actions/loaderAction';
import { getDate } from '../../../utils/getDate';
import { toastConfig } from '../../../utils/toastHelper';
import Header from '../../shared/Header';

const ContactUs = ({ contact }) => {
	const [contactInfo, setContactInfo] = useState({});
	const [name, setName] = useState('');
	const [mobile, setMobile] = useState('');
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		if (contact !== undefined || contact.length !== 0) {
			setContactInfo({
				tel: contact?.find((c) => c.id === '1')?.value,
				phone1: contact?.find((c) => c.id === '2')?.value,
				phone2: contact?.find((c) => c.id === '3')?.value,
				address: contact?.find((c) => c.id === '4')?.value,
				insta: contact?.find((c) => c.id === '5')?.value,
				email: contact?.find((c) => c.id === '6')?.value,
			});
		}
	}, [contact]);

	const resetForm = () => {
		setName('');
		setMobile('');
		setSubject('');
		setText('');
	};

	const handleSendMessage = () => {
		const data = new FormData();
		data.append('name', name);
		data.append('mobile', mobile);
		data.append('subject', subject);
		data.append('text', text);
		data.append('action', 'SEND');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/message.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					toast.success(data?.data?.msg, toastConfig);
					resetForm();
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
		<div>
			<Header />
			<div className="container">
				<h1 className="text-center fw-bolder py-3">با ما در تماس باشید</h1>
				<div className="row m-auto">
					<div className="col-12 col-md-6">
						<div className="contact-items">
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a href="tel:+982177714356">
									<span className="nn_icon">
										<FaPhone size={40} />
									</span>
									<p className="d-inline mx-3">{contactInfo?.tel}</p>
								</a>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<span className="nn_icon">
									<FaMobileAlt size={40} />
								</span>
								<p className="d-inline fw-bolder mx-3 mb-0">
									<a href={`tel:+98${contactInfo?.phone1?.substr(1)}`}>
										{contactInfo?.phone1}
									</a>{' '}
									-{' '}
									<a href={`tel:+98${contactInfo?.phone2?.substr(1)}`}>
										{contactInfo?.phone2}
									</a>
								</p>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a
									href={`https://www.instagram.com/${contactInfo?.insta?.substr(
										1,
									)}/`}
								>
									<span className="nn_icon">
										<FaInstagram size={40} />
									</span>
									<p className="contact_en d-inline mx-3" dir="ltr">
										{contactInfo?.insta}
									</p>
								</a>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a href={`mailto:${contactInfo?.email}`}>
									<span className="nn_icon">
										<FaRegEnvelope size={40} />
									</span>
									<p className="contact_en d-inline mx-3" dir="ltr">
										{contactInfo?.email}
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="py-3">
							<form className="contact_form" action="">
								<div className="row m-0">
									<div className="col m-0 p-0 input_fname">
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="نام و نام خانوادگی"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="col m-0 p-0">
										<input
											type="text"
											className="form-control"
											name="phone"
											placeholder="شماره همراه"
											value={mobile}
											onChange={(e) => setMobile(e.target.value)}
										/>
									</div>
								</div>
								<input
									type="phone"
									className="mt-2 form-control"
									name="subject"
									placeholder="موضوع"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
								/>
								<textarea
									className="mt-2 form-control"
									rows="4"
									name="text"
									placeholder="متن درخواست"
									value={text}
									onChange={(e) => setText(e.target.value)}
								></textarea>
								<div className="contact_submit mt-2 d-flex justify-content-end">
									<button
										type="button"
										className="nn_btn_secondary text-dark px-4"
										onClick={handleSendMessage}
									>
										ارســـــال
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		contact: main?.contact,
	};
}

export default connect(mapStateToProps)(ContactUs);
