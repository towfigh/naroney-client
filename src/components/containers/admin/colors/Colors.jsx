import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { GrAdd, GrCheckmark } from 'react-icons/gr';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLogs } from '../../../../app/Rules';
import { getAllColors, setColors } from '../../../../redux/actions/mainActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';
import ColorItem from './ColorItem';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const Colors = ({ colors }) => {
	const dispatch = useDispatch();
	const [addMode, setAddMode] = useState(false);
	const [colorName, setColorName] = useState('');
	const [colorCode, setColorCode] = useState('#ffffff');

	const handleAddColor = () => {
		const data = new FormData();
		data.append('name', colorName);
		data.append('code', colorCode);
		data.append('action', 'ADD');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/colors.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					setAddMode(false);
					dispatch(setColors(data?.data?.data));
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
		setColorName('');
		setColorCode('#ffffff');
	}, [addMode]);

	useEffect(() => {
		dispatch(getAllColors());
	}, [dispatch]);

	return (
		<>
			{addMode ? (
				<Row className="m-0 mb-2 d-flex justify-content-around">
					<Form.Group as={Col} controlId="colorName">
						<Form.Label>نام رنگ :</Form.Label>
						<Form.Control
							type="text"
							placeholder=""
							value={colorName}
							onChange={(e) => setColorName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col} className="text-center">
						<Form.Label>رنگ مربوطه :</Form.Label>
						<Form.Control
							type="color"
							placeholder=""
							className="m-auto"
							value={colorCode}
							onChange={(e) => setColorCode(e.target.value)}
						/>
					</Form.Group>
					<div className="col-12 col-sm-3 mt-3 d-flex align-items-end">
						<button
							className="nn_btn_primary w-50 fs-6 mx-2"
							type="button"
							onClick={() => handleAddColor()}
						>
							<GrCheckmark size={15} className="ms-1" />
							افزودن
						</button>
						<button
							className="nn_btn_secondary w-50 fs-6 mx-2"
							type="button"
							onClick={() => setAddMode(false)}
						>
							{/* <GrCheckmark size={15} className="ms-1" /> */}
							انصراف
						</button>
					</div>
				</Row>
			) : (
				<div className="pb-5">
					<button
						type="button"
						className="nn_btn_primary fs-6"
						onClick={() => setAddMode(true)}
					>
						<GrAdd size={20} className="ms-3" />
						افزودن رنگ جدید
					</button>
				</div>
			)}
			<div className="row m-0 mt-4 gx-5">
				{colors &&
					colors.map((item) => (
						<div
							key={item?.id}
							className="border-bottom border-end col-12 col-sm-6 col-lg-4 my-2"
						>
							<ColorItem item={item} />
						</div>
					))}
			</div>
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { colors: main?.colors };
}

export default connect(mapStateToProps)(Colors);
