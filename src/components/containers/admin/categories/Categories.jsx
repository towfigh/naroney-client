import axios from 'axios';
import React, { useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoriesUrl, showLogs } from '../../../../app/Rules';
import {
	getAllCategories,
	setCategories,
} from '../../../../redux/actions/mainActions';
import { getDate } from '../../../../utils/getDate';
import { toastConfig } from '../../../../utils/toastHelper';

const Categories = ({ categories }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const goToEditCategory = (id) => {
		navigate(`/admin/categories/edit/${id}`);
	};

	const handleDeleteCategory = (id) => {
		const data = new FormData();
		data.append('id', id);
		data.append('action', 'DELETE');
		data.append('date', getDate());

		axios
			.post('https://api.naroneymeson.ir/admin/categories.php', data)
			.then((data) => {
				if (showLogs) {
					console.log(data.data);
				}
				if (data?.data?.status === 'ok') {
					dispatch(setCategories(data?.data?.data));
					toast.success(data?.data?.msg, toastConfig);
				} else if (data?.data?.status === 'err') {
					toast.error(data?.data?.msg, toastConfig);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	return (
		<>
			<Link to="/admin/categories/add" className="nn_btn_primary w-75 fs-6">
				<GrAdd size={20} className="ms-3" />
				افزودن دسته بندی جدید
			</Link>

			<div className="row m-0">
				{categories &&
					categories?.map((item) => (
						<div key={item.id} className="col-12 col-sm-6 col-lg-3">
							<div className="category_item text-center position-relative">
								<div className="img_holder position-relative m-0">
									<div className="img_div">
										<img alt="" src={`${categoriesUrl}/${item.image}.jpg`} />
									</div>
								</div>
								<h3 className="position-absolute w-100">{item.name}</h3>
							</div>
							<div className="d-flex text-center">
								<button
									className="w-50 fw-bold rounded-0 border-0 bg-warning"
									onClick={() => goToEditCategory(item?.image)}
								>
									ویرایش
								</button>
								<button
									className="w-50 fw-bold rounded-0 border-0 bg-danger text-light"
									onClick={() => handleDeleteCategory(item?.image)}
								>
									حذف
								</button>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return { categories: main?.categories };
}

export default connect(mapStateToProps)(Categories);
