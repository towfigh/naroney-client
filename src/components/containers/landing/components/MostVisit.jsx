import React, { useLayoutEffect, useState } from 'react';
import Slider from '../../../shared/Slider';

const MostVisit = () => {
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
		<div className="most_visit">
			<h1 className="text-center fw-bolder mx-auto py-3 my-5">
				پربازدیدترین محصولات
			</h1>
			<Slider
				data={mostVisit}
				activeSlides={activeSlides}
				width="70%"
				slideMargin="10"
				animationDuration={1}
			/>
		</div>
	);
};

export default MostVisit;
