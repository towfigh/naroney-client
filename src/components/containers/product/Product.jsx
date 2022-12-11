import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TfiRulerAlt } from 'react-icons/tfi';
import { FaBarcode } from 'react-icons/fa';
import { MdOutlineColorLens, MdCheck } from 'react-icons/md';
import Header from '../../shared/Header';
import Slider from '../../shared/Slider';

const Product = () => {
	const [product_images] = useState([
		{
			id: 1,
			img: 'c1.png',
		},
		{
			id: 2,
			img: 'c2.png',
		},
		{
			id: 3,
			img: 'c3.jpg',
		},
		{
			id: 4,
			img: 'c4.jpg',
		},
	]);
	let { id } = useParams();
	const [stageImg, setStageImg] = useState(product_images[0]);

	const [mostVisit] = useState([
		{
			id: 1,
			img: 'c1.png',
			label: 'لباس شماره 1',
		},
		{
			id: 2,
			img: 'c2.png',
			label: 'لباس شماره 2',
		},
		{
			id: 3,
			img: 'c3.jpg',
			label: 'لباس شماره 3',
		},
		{
			id: 4,
			img: 'c4.jpg',
			label: 'لباس شماره 4',
		},
		{
			id: 5,
			img: 'c1.png',
			label: 'لباس شماره 5',
		},
		{
			id: 6,
			img: 'c2.png',
			label: 'لباس شماره 6',
		},
		{
			id: 7,
			img: 'c3.jpg',
			label: 'لباس شماره 7',
		},
		{
			id: 8,
			img: 'c4.jpg',
			label: 'لباس شماره 8',
		},
		{
			id: 9,
			img: 'c2.png',
			label: 'لباس شماره 9',
		},
		{
			id: 10,
			img: 'c3.jpg',
			label: 'لباس شماره 10',
		},
		{
			id: 11,
			img: 'c4.jpg',
			label: 'لباس شماره 11',
		},
	]);
	const [activeSlides, setActiveSlides] = useState(4);

	useLayoutEffect(() => {
		if (window.innerWidth < 576) {
			setActiveSlides(1);
		} else if (window.innerWidth < 900) {
			setActiveSlides(2);
		} else if (window.innerWidth < 1100) {
			setActiveSlides(3);
		}
	}, []);
	return (
		<>
			<Header />
			<div className="container">
				<div className="row py-5 mt-3 m-auto d-flex flex-column-reverse flex-md-row">
					<div className="col-12 col-md-6 mt-5">
						<h2 className="text-center fw-bold">لباس عروس شماره {id}</h2>
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<TfiRulerAlt size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">سایز :</p>
							<p className="d-inline fw-bolder">40</p>
						</div>
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<MdOutlineColorLens size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">رنگ :</p>
							<p className="d-inline fw-bolder">سفید</p>
						</div>
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<MdCheck size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">موجود جهت سفارش</p>
						</div>
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<MdCheck size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">موجود جهت اجاره</p>
						</div>
						<div className="info_item mt-4 mt-lg-5">
							<span>
								<FaBarcode size={40} />
							</span>
							<p className="d-inline fw-bolder mx-3">کد محصول :</p>
							<p className="d-inline fw-bolder">4163</p>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="row m-auto">
							<div className="col-12 col-md-9">
								<img
									className="w-100 mt-3"
									src={`${process.env.PUBLIC_URL}/img/${stageImg.img}`}
									alt=""
								/>
							</div>
							<div className="col-12 col-md-3">
								<div className="row m-auto">
									{product_images.map((item) => (
										<div key={item.id} className="product-img col-3 col-md-12">
											<button
												type="button"
												className="bg-transparent border-0 p-0"
												onClick={() =>
													setStageImg(
														product_images.find((i) => i.id === item.id),
													)
												}
											>
												<img
													className={
														item.id !== stageImg.id
															? 'w-100 mt-3 product-img_deactive'
															: 'w-100 mt-3'
													}
													src={`${process.env.PUBLIC_URL}/img/${item.img}`}
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
			<h1 className="middle-title_lg text-center fw-bolder mx-auto py-3 my-4">
				محصولات مشابه
			</h1>
			<Slider
				data={mostVisit}
				activeSlides={activeSlides}
				width="70%"
				slideMargin="10"
				animationDuration={1}
			/>
			<div className="text-center py-5">
				<button className="nn_btn_primary">نمایش تمام مدل های</button>
			</div>
		</>
	);
};

export default Product;
