import React, { useEffect, useState } from 'react';
import { GrTrash } from 'react-icons/gr';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
	deleteMesssage,
	getAllMesssages,
} from '../../../../redux/actions/mainActions';

const Messages = ({ messages }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [allMessages, setAllMessages] = useState([]);
	useEffect(() => {
		dispatch(getAllMesssages());
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		setAllMessages(messages);
	}, [messages]);

	const setToShow = (how) => {
		if (how === 'all') {
			setAllMessages(messages);
		} else if (how === 'unread') {
			setAllMessages(messages?.filter((m) => m.seen_at === null));
		}
	};

	const showMessage = (id) => {
		navigate(`/admin/messages/${id}`);
	};

	const handleDeleteMessage = (id) => {
		dispatch(deleteMesssage(id));
	};

	return (
		<div>
			<div className="d-flex justify-content-around mb-4">
				<button
					className="nn_btn_primary fs-6 rounded"
					onClick={() => setToShow('all')}
				>
					همه ( {messages?.length} )
				</button>
				<button
					className="nn_btn_primary fs-6 rounded"
					onClick={() => setToShow('unread')}
				>
					خوانده نشده ( {messages?.filter((m) => m.seen_at === null)?.length} )
				</button>
			</div>
			<table className="table text-center">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">موضوع</th>
						<th scope="col">فرستنده</th>
						<th className="d-none d-md-table-cell" scope="col">
							تلفن
						</th>
						<th className="d-none d-md-table-cell" scope="col">
							تاریخ
						</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{allMessages?.map((item) => (
						<tr key={item?.id}>
							<td onClick={() => showMessage(item?.id)}>
								{item?.seen_at === null ? (
									<span className="unread_msg" />
								) : (
									<span className="read_msg" />
								)}
							</td>
							<td onClick={() => showMessage(item?.id)}>{item?.subject}</td>
							<td onClick={() => showMessage(item?.id)}>{item?.name}</td>
							<td
								onClick={() => showMessage(item?.id)}
								className="d-none d-md-table-cell"
							>
								{item?.phone}
							</td>
							<td
								onClick={() => showMessage(item?.id)}
								className="d-none d-md-table-cell"
							>
								{item?.created_at}
							</td>
							<td>
								<button
									className="bg-transparent border-0 p-0"
									type="button"
									onClick={() => handleDeleteMessage(item?.id)}
								>
									<GrTrash size={20} className="" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { messages: main?.messages };
}

export default connect(mapStateToProps)(Messages);
