import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../../utils/toastHelper';
import { getDate } from '../../../../utils/getDate';
import ImageCropper from '../../../../utils/ImageCropper';
import { setCategories } from '../../../../redux/actions/mainActions';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { categoriesUrl, showLogs } from '../../../../app/Rules';
import BackBtn from '../../../shared/backBtn';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const EditCategory = ({ categories }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const category = categories?.find((c) => c.image === id);

	const [name, setName] = useState(category?.name);
	const [isOldImg, setIsOldImg] = useState(1);

	const [images, setImages] = React.useState([]);
	const [croppedImage, setCroppedImage] = useState(
		`${categoriesUrl}/${category?.image}.jpg`,
	);
	const [modal, setModal] = useState(false);

	const onChange = (imageList, addUpdateIndex) => {
		setModal(true);
		setImages(imageList);
		setIsOldImg(0);
	};

	const handleEditCategory = () => {
		const data = new FormData();
		data.append('id', id);
		data.append('name', name);
		data.append('image', croppedImage);
		data.append('isOldImg', isOldImg);
		data.append('action', 'EDIT');
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
				ویرایش : {category?.name}
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

			<ImageUploading value={images} onChange={onChange}>
				{({ onImageUpload, onImageUpdate }) => (
					<button
						className="nn_btn_secondary d-block w-100 mb-3 mt-2"
						onClick={images ? onImageUpload : () => onImageUpdate(0)}
					>
						تغییر عکس
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
						onClick={handleEditCategory}
					>
						تایید ویرایش
					</button>
				</>
			)}
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { categories: main?.categories };
}

export default connect(mapStateToProps)(EditCategory);
