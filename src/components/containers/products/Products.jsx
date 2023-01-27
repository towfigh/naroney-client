import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { productsUrl, showLogs } from '../../../app/Rules';
import Header from '../../shared/Header';
import { clearLoading, setLoading } from '../../../redux/actions/loaderAction';

const Products = ({ categories }) => {
	let { cat } = useParams();
	const dispatch = useDispatch();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const data = new FormData();
		data.append('action', 'BYCAT');
		data.append('cat', cat);
		dispatch(setLoading());

		axios
			.post('https://api.naroneymeson.ir/admin/products.php', data)
			.then((data) => {
				dispatch(clearLoading());
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					setProducts(
						data?.data?.data?.sort((a, b) => b.visit_count - a.visit_count),
					);
				}
			})

			.catch((err) => {
				dispatch(clearLoading());
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Header />
			<h1 className="middle-title_lg text-center fw-bolder mx-auto py-3 my-4">
				{cat === '0'
					? 'تمام محصولات'
					: categories?.find((i) => i.id === cat)?.name}
			</h1>
			<div className="row g-3 pb-3 m-auto container">
				{products?.map((item) => (
					<div
						key={item?.id}
						className="text-center py-2 mt-3 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
					>
						<div className="pb-3 shadow border rounded-3">
							<Link to={`/product/${item?.code}`}>
								<img
									alt=""
									src={`${productsUrl}/${item?.image}.jpg`}
									className="w-100"
								/>
								<h4 className="my-3">{item?.name}</h4>
								<button type="button" className="nn_btn_secondary_sm">
									مشاهده جزئیات
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
			{/* {cat !== '0' && (
				<div className="text-center py-5">
					<button className="nn_btn_primary">نمایش تمام مدل های</button>
				</div>
			)} */}
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		categories: main?.categories,
	};
}

export default connect(mapStateToProps)(Products);
