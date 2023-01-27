import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import { GrTrash } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../../utils/toastHelper';
import { getDate } from '../../../../utils/getDate';
import ImageCropper from '../../../../utils/ImageCropper';
import { setProducts } from '../../../../redux/actions/mainActions';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { showLogs } from '../../../../app/Rules';
import BackBtn from '../../../shared/backBtn';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';

const AddProduct = ({ colors, categories, sizes }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [category, setCategory] = useState(categories[0]?.id);
	const [size, setSize] = useState(sizes[0]?.id);
	const [color, setColor] = useState(colors[0]?.id);
	const [sell, setSell] = useState(false);
	const [rent, setRent] = useState(false);
	const [desc, setDesc] = useState('');

	const [images, setImages] = React.useState([]);
	const [croppedImage, setCroppedImage] = useState([]);
	const [modal, setModal] = useState(false);

	const onChange = (imageList, addUpdateIndex) => {
		setModal(true);
		setImages(imageList);
	};

	const handleDeleteImage = (index) => {
		const tempImages = croppedImage.filter((i) => i !== croppedImage[index]);
		setCroppedImage(tempImages);
	};

	const handleAddProduct = () => {
		const data = new FormData();
		data.append('name', name);
		data.append('category', category);
		data.append('size', size);
		data.append('color', color);
		data.append('sell', sell ? 1 : 0);
		data.append('rent', rent ? 1 : 0);
		data.append('desc', desc);
		data.append('image', JSON.stringify(croppedImage));
		data.append('action', 'ADD');
		data.append('date', getDate());
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/products.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setProducts(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
					navigate('/admin/products', { replace: true });
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
				افزودن محصول جدید
			</h3>
			<div className="row m-0">
				<div className="col-12 col-md-6 col-xl-4">
					<Form.Group className="mb-3" controlId="productName">
						<Form.Label>نام محصول :</Form.Label>
						<Form.Control
							className="text-center"
							type="text"
							placeholder=""
							autoComplete="false"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</Form.Group>
				</div>
				<div className="col-12 col-md-6 col-xl-4">
					<Form.Group className="mb-3" controlId="productCat">
						<Form.Label>دسته بندی :</Form.Label>
						<Form.Select
							className="text-center"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							{categories?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</div>
				<div className="col-12 col-md-6 col-xl-4">
					<div className="mb-3">
						<Form.Label>سایز :</Form.Label>
						<Form.Select
							className="text-center"
							value={size}
							onChange={(e) => setSize(e.target.value)}
						>
							{sizes?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.size}
								</option>
							))}
						</Form.Select>
					</div>
				</div>
				<div className="col-12 col-md-6 col-xl-4">
					<Form.Group className="mb-4" controlId="productColor">
						<Form.Label>رنگ :</Form.Label>
						<Form.Select
							className="text-center"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						>
							{colors?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</div>
				<div className="d-flex align-items-sm-center mb-3 col-6 col-md-3 col-xl-2">
					<Form.Check
						inline
						label="جهت فروش :"
						name="productForSell"
						type="checkbox"
						checked={sell}
						onChange={(e) => setSell((prev) => !prev)}
					/>
				</div>
				<div className="d-flex align-items-sm-center mb-3 col-6 col-md-3 col-xl-2">
					<Form.Check
						inline
						label="جهت اجاره :"
						name="productForRent"
						type="checkbox"
						checked={rent}
						onChange={(e) => setRent((prev) => !prev)}
					/>
				</div>
				<div className="col-12 col-md-6 col-xl-4">
					<Form.Group className="mb-3" controlId="productDesc">
						<Form.Label className="">توضیحات :</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							autoComplete="false"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							required
						/>
					</Form.Group>
				</div>
			</div>

			<Form.Label className="">تصاویر مربوطه :</Form.Label>

			<ImageCropper
				open={modal}
				image={images.length > 0 && images[0].dataURL}
				onComplete={(imagePromisse) => {
					imagePromisse.then((image) => {
						croppedImage.push(image);
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
			<div className="row m-0">
				{croppedImage
					? croppedImage.map((item, index) => (
							<div
								key={index}
								className="text-center col-6 col-sm-4 col-md-2 my-2"
							>
								<img
									src={croppedImage[index]}
									alt=""
									className="h-auto mw-100"
								/>
								<div className="text-center">
									<button
										className="nn_btn_secondary fs-6 mt-2"
										onClick={() => handleDeleteImage(index)}
									>
										حذف <GrTrash size={20} className="" />
									</button>
								</div>
							</div>
					  ))
					: ''}
				{croppedImage?.length < 5 ? (
					<div className="text-center col-6 col-sm-4 col-md-2 my-2 d-flex align-items-center">
						<ImageUploading value={images} onChange={onChange}>
							{({ onImageUpload, onImageUpdate }) => (
								<button
									className="btn nn_btn_secondary d-block w-100 mb-3 mt-2"
									onClick={images ? onImageUpload : () => onImageUpdate(0)}
								>
									افزودن عکس
								</button>
							)}
						</ImageUploading>
					</div>
				) : (
					''
				)}
			</div>
			{croppedImage[0] ? (
				<button
					className="nn_btn_primary d-block w-100 my-3"
					onClick={handleAddProduct}
				>
					افزودن محصول
				</button>
			) : (
				''
			)}
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		categories: main?.categories,
		sizes: main?.sizes,
		colors: main?.colors,
	};
}

export default connect(mapStateToProps)(AddProduct);
