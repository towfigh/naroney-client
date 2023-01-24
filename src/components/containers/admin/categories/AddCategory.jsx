import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../../utils/toastHelper';
import { getDate } from '../../../../utils/getDate';
import ImageCropper from '../../../../utils/ImageCropper';
import { setCategories } from '../../../../redux/actions/mainActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { showLogs } from '../../../../app/Rules';
import BackBtn from '../../../shared/backBtn';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const AddCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState('');

	const [images, setImages] = React.useState([]);
	const [croppedImage, setCroppedImage] = useState(null);
	const [modal, setModal] = useState(false);
	// const maxNumber = 69;

	const onChange = (imageList, addUpdateIndex) => {
		setModal(true);
		// console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};

	const handleAddCategory = () => {
		const data = new FormData();
		data.append('name', name);
		data.append('image', croppedImage);
		data.append('action', 'ADD');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/categories.php', data)
			.then((data) => {
				dispatch(clearLoading());

				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setCategories(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
					navigate('/admin/categories', { replace: true });
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
		<>
			<BackBtn />
			<h3 className="middle-title_lg text-center fw-bolder mx-auto py-3 mb-4">
				افزودن دسته بندی جدید
			</h3>
			<Form.Group className="mb-3" controlId="catName">
				<Form.Label className="">نام دسته بندی :</Form.Label>
				<Form.Control
					type="text"
					placeholder="مثلا : لباس عروس"
					autoComplete="false"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Label className="">تصویر مربوطه :</Form.Label>

			{/* <ImageUploading
				// multiple
				value={images[0]}
				onChange={onChange}
				// maxNumber={maxNumber}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					<div className="text-center">
						<button
							style={isDragging ? { color: 'red' } : undefined}
							onClick={onImageUpload}
							{...dragProps}
						>
							آپلود عکس
						</button>
						&nbsp;
						<button onClick={onImageRemoveAll}>Remove all images</button>
						{imageList.map((image, index) => (
							<div key={index}>
								<img
									src={image['data_url']}
									alt=""
									width="100"
									className="my-3"
								/>
								<div className="text-center">
						<button onClick={() => onImageUpdate(index)}>تغییر</button>
						<button onClick={() => onImageRemove(index)}>حذف</button>
								</div>
							</div>
						))}
					</div>
				)}
			</ImageUploading> */}

			<ImageUploading value={images} onChange={onChange}>
				{({ onImageUpload, onImageUpdate }) => (
					<button
						className="nn_btn_secondary d-block w-100 mb-3 mt-2"
						onClick={images ? onImageUpload : () => onImageUpdate(0)}
					>
						انتخاب عکس
					</button>
				)}
			</ImageUploading>

			<ImageCropper
				open={modal}
				image={images.length > 0 && images[0].dataURL}
				onComplete={(imagePromisse) => {
					imagePromisse.then((image) => {
						setCroppedImage(image);
						setModal(false);
					});
				}}
				containerStyle={{
					position: 'relative',
					width: '100%',
					height: '50vh',
					background: '#333',
				}}
			/>
			{croppedImage && (
				<>
					<div className="text-center">
						<img
							src={croppedImage}
							alt="category_image"
							className="h-auto mw-100"
						/>
					</div>
					<button
						className="nn_btn_primary d-block w-100 my-3"
						onClick={handleAddCategory}
					>
						افزودن دسته بندی
					</button>
				</>
			)}
		</>
	);
};

export default AddCategory;
