import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../../shared/Header';

const Products = () => {
	let { cat } = useParams();
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

	return (
		<>
			<Header />
			<h1 className="middle-title_lg text-center fw-bolder mx-auto py-3 my-4">
				محصولات
			</h1>
			<div className="row g-3 pb-3 m-auto container">
				{mostVisit.map((item) => (
					<div className="text-center py-2 mt-3 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
						<div className="pb-3 shadow border rounded-3">
							<img
								alt=""
								src={`${process.env.PUBLIC_URL}/img/${item.img}`}
								className="w-100"
							/>
							<h4 className="my-3">{item.label}</h4>
							<button type="button" className="nn_btn_secondary px-1 py-0">
								<Link to={`/product/${item.id}`}>مشاهده جزئیات</Link>
							</button>
						</div>
					</div>
				))}
			</div>
			{cat !== '0' && (
				<div className="text-center py-5">
					<button className="nn_btn_primary">نمایش تمام مدل های</button>
				</div>
			)}
		</>
	);
};

export default Products;
