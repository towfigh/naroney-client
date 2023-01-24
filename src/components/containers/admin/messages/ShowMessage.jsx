import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { seenMesssage } from '../../../../redux/actions/mainActions';
import BackBtn from '../../../shared/backBtn';

const ShowMessage = ({ messages }) => {
	const { id } = useParams();
	const [message, setMessage] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		setMessage(messages?.find((m) => m.id === id));
	}, [id, messages]);
	useEffect(() => {
		dispatch(seenMesssage(id));
		// eslint-disable-next-line
	}, []);
	return (
		<div>
			<BackBtn />
			<div>
				<span>نام فرستنده پیام : </span>
				<h5 className="d-inline me-2 border-bottom px-2 py-1">
					{message?.name}
				</h5>
			</div>
			<div className="mt-3 mt-lg-4">
				<span>تلفن : </span>
				<h5 className="d-inline me-2 border-bottom px-2 py-1">
					{message?.phone}
				</h5>
			</div>
			<div className="mt-3 mt-lg-4">
				<span>تاریخ : </span>
				<h5 className="d-inline me-2 border-bottom px-2 py-1">
					{message?.created_at}
				</h5>
			</div>
			<div className="mt-3 mt-lg-4">
				<span>موضوع : </span>
				<h5 className="d-inline me-2 border-bottom px-2 py-1">
					{message?.subject}
				</h5>
			</div>
			<div className="mt-3 mt-lg-4">
				<span>متن درخواست : </span>
				<p className="p-3 border rounded">{message?.text}</p>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { messages: main?.messages };
}

export default connect(mapStateToProps)(ShowMessage);
