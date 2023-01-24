import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { productsUrl } from '../../app/Rules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import 'swiper/css/virtual';

import { Link } from 'react-router-dom';
const Slider = ({ data }) => {
	const [slidesPerView, setSlidesPerView] = useState(2);
	const [emptySlide, setEmptySlide] = useState([]);
	useEffect(() => {
		if (data[0]) {
			if (window.innerWidth < 768) {
				setSlidesPerView(2);
				if (data?.length < 2) {
					const tempRmpty = [];
					for (let i = 0; i < 2 - data?.length; i++) {
						tempRmpty.push({ id: i });
					}
					setEmptySlide(tempRmpty);
				} else {
					setEmptySlide([]);
				}
			} else {
				setSlidesPerView(5);
				if (data?.length < 5) {
					const tempRmpty = [];
					for (let i = 0; i < 5 - data?.length; i++) {
						tempRmpty.push({ id: i });
					}
					setEmptySlide(tempRmpty);
				} else {
					setEmptySlide([]);
				}
			}
		}
		// eslint-disable-next-line
	}, [data]);
	return (
		<div className="d-flex justify-content-around">
			<Swiper
				spaceBetween={50}
				slidesPerView={slidesPerView}
				navigation
				speed={1000}
				pagination={{ clickable: true }}
				// scrollbar={{ draggable: true }}
				modules={[Navigation, Pagination, A11y]}
				// onSlideChange={() => console.log('slide change')}
				// onSwiper={(swiper) => console.log(swiper)}
				className="px-5 pb-3"
			>
				{data?.slice(0, 15)?.map((item) => (
					<SwiperSlide key={item?.code} className="text-center pb-4">
						<img
							className="slider_img w-100 my-2"
							src={`${productsUrl}/${item?.image}.jpg`}
							alt=""
						/>
						<h6 className="text-center">{item?.name}</h6>
						<button type="button" className="nn_btn_secondary_sm m-auto">
							<Link to={`/product/${item?.code}`}>مشاهده جزئیات</Link>
						</button>
					</SwiperSlide>
				))}
				{emptySlide?.map((item) => (
					<SwiperSlide key={item?.id} className="text-center pb-4" />
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
