import React, { useState } from 'react';
import { GrCheckmark, GrEdit, GrTrash } from 'react-icons/gr';
import { RxCross1 } from 'react-icons/rx';
import { Form } from 'react-bootstrap';
import { getDate } from '../../../../utils/getDate';
import axios from 'axios';
import { showLogs } from '../../../../app/Rules';
import { useDispatch } from 'react-redux';
import { setColors } from '../../../../redux/actions/mainActions';
import { toastConfig } from '../../../../utils/toastHelper';
import { toast } from 'react-toastify';

const ColorItem = ({ item }) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [colorName, setColorName] = useState(item?.name);
	const [colorCode, setColorCode] = useState(item?.code);

	const onCancelEdit = () => {
		setEditMode(false);
		setColorName(item?.name);
		setColorCode(item?.code);
	};

	const handleDeleteColor = () => {
		const data = new FormData();
		data.append('id', item?.id);
		data.append('action', 'DELETE');
		data.append('date', getDate());

		axios
			.post('https://api.naroneymeson.ir/admin/colors.php', data)
			.then((data) => {
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setColors(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => console.log(err));
	};
	const handleEditColor = () => {
		const data = new FormData();
		data.append('id', item?.id);
		data.append('name', colorName);
		data.append('code', colorCode);
		data.append('action', 'EDIT');
		data.append('date', getDate());

		axios
			.post('https://api.naroneymeson.ir/admin/colors.php', data)
			.then((data) => {
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					setEditMode(false);
					dispatch(setColors(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="color_item d-flex align-items-center justify-content-around">
			<div className="">
				<Form.Control
					type="text"
					placeholder=""
					className="m-auto p-1 text-center"
					value={colorName}
					onChange={(e) => setColorName(e.target.value)}
					disabled={!editMode}
				/>
			</div>
			<div className="text-center">
				<Form.Control
					type="color"
					placeholder=""
					className="m-auto border-0"
					value={colorCode}
					onChange={(e) => setColorCode(e.target.value)}
					disabled={!editMode}
				/>
			</div>
			<div className="d-flex align-items-center justify-content-center">
				{editMode ? (
					<>
						<button
							className="nn_btn_primary fs-6 py-0 px-1 mx-1"
							type="button"
							onClick={handleEditColor}
						>
							<GrCheckmark size={15} className="" />
						</button>
						<button
							className="nn_btn_secondary fs-6 py-0 px-1 mx-1"
							type="button"
							onClick={onCancelEdit}
						>
							<RxCross1 size={15} className="" />
						</button>
					</>
				) : (
					<>
						<button
							className="bg-transparent border-0 p-0"
							type="button"
							onClick={() => setEditMode(true)}
						>
							<GrEdit size={20} className="ms-3" />
						</button>
						<button
							className="bg-transparent border-0 p-0"
							type="button"
							onClick={handleDeleteColor}
						>
							<GrTrash size={20} className="ms-3" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ColorItem;
