import React, { useRef, useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Slider = ({
	data,
	activeSlides,
	width,
	slideMargin,
	animationDuration,
}) => {
	const img_div = useRef(null);
	const [offSet, setOffSet] = useState(0);
	const [xDown, setXDown] = useState(0);

	const handleGoLeft = () => {
		if (
			offSet <=
			(data.length - Number(activeSlides)) *
				(img_div?.current?.clientWidth + slideMargin * 2)
		) {
			setOffSet(
				(pre) =>
					pre + (img_div?.current?.clientWidth + Number(slideMargin) * 2),
			);
		}
	};

	const handleGoRight = () => {
		if (offSet > img_div?.current?.clientWidth + slideMargin * 2) {
			setOffSet(
				(pre) =>
					pre - (img_div?.current?.clientWidth + Number(slideMargin) * 2),
			);
		} else {
			setOffSet(0);
		}
	};

	return (
		<div className="d-flex justify-content-around">
			<div className="nav_right d-flex align-items-center justify-content-center">
				<button type="button" onClick={handleGoRight} disabled={offSet === 0}>
					<FaChevronRight size={50} />
				</button>
			</div>

			<div
				className="slider text-center position-relative"
				style={{ width: `${width}` }}
			>
				<div className="slide position-relative m-0">
					<div className="slide_img d-flex" style={{ width: `${width}` }}>
						{data.map((item) => {
							return (
								<div
									className="shadow"
									key={item.id}
									style={{
										width: `${100 / Number(activeSlides)}%`,
										margin: `${slideMargin}px`,
										transform: `translateX(${offSet}px)`,
										transition: `all ${animationDuration}s`,
									}}
									ref={img_div}
									onTouchStart={(e) => setXDown(e.touches[0].clientX)}
									onTouchMove={(e) => {
										if (e.touches[0].clientX - xDown > 0) {
											if (
												offSet <=
												(data.length - Number(activeSlides)) *
													(img_div?.current?.clientWidth + slideMargin * 2)
											) {
												setOffSet((pre) => pre + 40);
											}
										} else {
											if (offSet > 0) {
												setOffSet((pre) => pre - 40);
											}
										}
									}}
								>
									<img
										alt=""
										src={`${process.env.PUBLIC_URL}/img/${item.img}`}
									/>
									<h4 className="my-3">{item.label}</h4>
									<button
										type="button"
										className="nn_btn_secondary fs-6 px-1 py-0"
									>
										<Link to={`/product/${item.id}`}>مشاهده جزئیات</Link>
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div className="nav_left d-flex align-items-center justify-content-center">
				<button
					type="button"
					onClick={handleGoLeft}
					disabled={
						offSet >=
						(data.length - Number(activeSlides)) *
							(img_div?.current?.clientWidth + slideMargin * 2)
					}
				>
					<FaChevronLeft size={50} />
				</button>
			</div>
		</div>
	);
};

export default Slider;
