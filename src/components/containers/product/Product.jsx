import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TfiRulerAlt } from 'react-icons/tfi';
// import { FaBarcode } from 'react-icons/fa';
import { MdOutlineColorLens, MdCheck, MdEditNote } from 'react-icons/md';
import Header from '../../shared/Header';
import Slider from '../../shared/Slider';

import axios from 'axios';
import { productsUrl, showLogs } from '../../../app/Rules';
import { connect, useDispatch } from 'react-redux';
import { clearLoading, setLoading } from '../../../redux/actions/loaderAction';

const Product = ({ sizes, colors, categories }) => {
	let { code } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState();
	const [images, setImages] = useState([]);
	const [similar, setSimilar] = useState([]);

	const navifate = useNavigate();
	const [stageImg, setStageImg] = useState();

	useEffect(() => {
		const data = new FormData();
		data.append('action', 'BYCODE');
		data.append('code', code);
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/products.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					setProduct(data?.data?.data?.product[0]);
					setStageImg(data?.data?.data?.images[0]);
					setImages(data?.data?.data?.images);
					setSimilar(data?.data?.data?.similar);
				}
			})
			.catch((err) => {
				dispatch(clearLoading());
				console.log(err);
			});
		// eslint-disable-next-line
	}, [code]);

	return (
		<>
			<Header />
			<div className="mt-lg-5 container">
				<h2 className="text-center fw-bold d-block d-md-none pt-4">
					{product?.name}
				</h2>
				<div className="row m-auto mb-5 d-flex flex-column-reverse flex-md-row">
					<div className="col-12 col-md-6">
						<h2 className="text-center fw-bold d-none d-md-block">
							{product?.name}
						</h2>
						{sizes?.find((s) => s.id === product?.size_id)?.size !== '0' ? (
							<div className="info_item mt-4 mt-lg-5">
								<span>
									<TfiRulerAlt size={40} />
								</span>
								<p className="d-inline fw-bolder mx-3">سایز :</p>
								<p className="d-inline fw-bolder">
									{sizes?.find((s) => s.id === product?.size_id)?.size}
								</p>
							</div>
						) : (
							''
						)}
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<MdOutlineColorLens size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">رنگ :</p>
							<p className="d-inline fw-bolder">
								{colors?.find((s) => s.id === product?.color_id)?.name}
							</p>
						</div>

						{product?.is_sell === '1' ? (
							<div className="info_item mt-4 mt-lg-5">
								<span>
									<MdCheck size={40} />
								</span>
								<p className="d-inline fw-bolder mx-3">موجود جهت فروش</p>
							</div>
						) : (
							''
						)}
						{product?.is_rent === '1' ? (
							<div className="info_item mt-4 mt-lg-5">
								<span>
									<MdCheck size={40} />
								</span>
								<p className="d-inline fw-bolder mx-3">موجود جهت اجاره</p>
							</div>
						) : (
							''
						)}

						<div className="info_item mt-4 mt-lg-5">
							<span>
								<MdEditNote size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">توضیحات :</p>
							<p className="d-inline-block mt-2 fw-bolder">
								{product?.description}
							</p>
						</div>
						{/* <div className="info_item mt-4 mt-lg-5">
							<span>
								<FaBarcode size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">کد محصول :</p>
							<p className="d-inline fw-bolder"></p>
						</div> */}
					</div>
					<div className="col-12 col-md-6">
						<div className="row m-auto">
							<div className="col-12 col-md-9">
								<img
									className="w-100 mt-3"
									src={`${productsUrl}/${stageImg?.image}.jpg`}
									alt=""
								/>
							</div>
							<div className="col-12 col-md-3">
								<div className="row m-auto">
									{images?.map((item) => (
										<div key={item.id} className="product-img col-3 col-md-12">
											<button
												type="button"
												className="bg-transparent border-0 p-0"
												onClick={() =>
													setStageImg(images.find((i) => i.id === item.id))
												}
											>
												<img
													className={
														item.id !== stageImg.id
															? 'w-100 mt-3'
															: 'w-100 mt-3 product-img_deactive'
													}
													src={`${productsUrl}/${item.image}.jpg`}
													alt=""
												/>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h1 className="middle-title_lg text-center fw-bolder mx-auto my-4">
				محصولات مشابه
			</h1>

			<Slider
				data={similar
					?.filter((p) => p.code !== code)
					?.sort((a, b) => b.visit_count - a.visit_count)}
			/>

			{categories?.find((c) => c.id === product?.category_id)?.name ? (
				<div className="text-center py-5">
					<button
						className="nn_btn_primary fs-6"
						onClick={() => navifate(`/products/${product?.category_id}`)}
					>
						نمایش تمام مدل های{' '}
						{categories?.find((c) => c.id === product?.category_id)?.name}
					</button>
				</div>
			) : (
				''
			)}
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		sizes: main?.sizes,
		colors: main?.colors,
		categories: main?.categories,
	};
}

export default connect(mapStateToProps)(Product);
