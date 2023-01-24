import axios from 'axios';
import React, { useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productsUrl, showLogs } from '../../../../app/Rules';
import {
	clearLoading,
	setLoading,
} from '../../../../redux/actions/loaderAction';
import {
	getAllProducts,
	setProducts,
} from '../../../../redux/actions/mainActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';

const ProductsAdmin = ({ products }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goToEditProduct = (id) => {
		navigate(`/admin/products/edit/${id}`);
	};

	const handleDeleteProduct = ({ id, code }) => {
		const data = new FormData();
		data.append('id', id);
		data.append('code', code);
		data.append('action', 'DELETE');
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
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => {
				dispatch(clearLoading());
				console.log(err);
			});
	};

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<>
			<Link to="/admin/products/add" className="nn_btn_primary w-75 fs-6">
				<GrAdd size={20} className="ms-3" />
				افزودن محصول جدید
			</Link>

			<div className="row g-3 pb-3 m-auto container">
				{products[0] &&
					products?.map((item) => (
						<div
							key={item.id}
							className="text-center py-2 mt-3 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
						>
							<div className="pb-3 shadow border rounded-3">
								<img
									alt=""
									src={`${productsUrl}/${item.image}.jpg`}
									className="w-100"
								/>
								<h4 className="my-3">{item?.name}</h4>
								<div className="d-flex text-center">
									<button
										className="w-50 fw-bold rounded-0 border-0 bg-warning text-dark"
										onClick={() => goToEditProduct(item?.id)}
									>
										ویرایش
									</button>
									<button
										className="w-50 fw-bold rounded-0 border-0 bg-danger text-light"
										onClick={() => handleDeleteProduct(item)}
									>
										حذف
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { products: main?.products };
}

export default connect(mapStateToProps)(ProductsAdmin);
