import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Form } from 'react-bootstrap';
import { GrAdd, GrCheckmark, GrTrash } from 'react-icons/gr';
import { RxCross1 } from 'react-icons/rx';
import { getDate } from '../../../../utils/getDate';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../../utils/toastHelper';
import { showLogs } from '../../../../app/Rules';
import { getAllSizes, setSizes } from '../../../../redux/actions/mainActions';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const Sizes = ({ sizes }) => {
	const dispatch = useDispatch();
	const [addMode, setAddMode] = useState(false);
	const [size, setSize] = useState('');

	const handleAddSize = () => {
		const data = new FormData();
		data.append('size', size);
		data.append('action', 'ADD');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/sizes.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					setAddMode(false);
					dispatch(setSizes(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
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
		dispatch(getAllSizes());
	}, [dispatch]);

	const handleDeleteSize = (id) => {
		const data = new FormData();
		data.append('id', id);
		data.append('action', 'DELETE');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/sizes.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setSizes(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
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
			{addMode ? (
				<div className="row m-0 mb-2 d-flex justify-content-around">
					<Form.Group as={Col} controlId="size">
						<Form.Label>سایز :</Form.Label>
						<Form.Control
							type="number"
							placeholder=""
							value={size}
							onChange={(e) => setSize(e.target.value)}
						/>
					</Form.Group>
					<div className="col col-sm-3 mt-3 d-flex align-items-end">
						<button
							className="nn_btn_primary w-50 fs-6 mx-1"
							type="button"
							onClick={() => handleAddSize()}
						>
							<GrCheckmark size={15} className="" />
						</button>
						<button
							className="nn_btn_secondary w-50 fs-6 mx-1"
							type="button"
							onClick={() => setAddMode(false)}
						>
							<RxCross1 size={15} className="" />
						</button>
					</div>
				</div>
			) : (
				<div className="pb-5">
					<button
						type="button"
						className="nn_btn_primary fs-6"
						onClick={() => setAddMode(true)}
					>
						<GrAdd size={20} className="ms-3" />
						افزودن سایز جدید
					</button>
				</div>
			)}

			<div className="row m-0 mt-4">
				{sizes &&
					sizes.map((item) => (
						<div
							key={item?.id}
							className="text-center border col-4 col-sm-3 col-lg-2 col-xl-1 py-2 my-2"
						>
							<h3>{item?.size}</h3>
							<button
								className="bg-transparent border-0 p-0"
								type="button"
								onClick={() => handleDeleteSize(item?.id)}
							>
								<GrTrash size={20} className="" />
							</button>
						</div>
					))}
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { sizes: main?.sizes };
}

export default connect(mapStateToProps)(Sizes);
