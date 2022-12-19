import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const items = [
		{ id: 1, name: 'تنظیمات حساب', image: 'profile.png', url: 'profile' },
		{ id: 2, name: 'اطلاعات تماس', image: 'contact.png', url: 'editcontact' },
		{ id: 3, name: 'محصولات', image: 'products.png', url: 'products' },
		{ id: 4, name: 'دسته بندی', image: 'category.png', url: 'categories' },
	];
	return (
		<>
			<div className="row m-0">
				{items.map((item) => (
					<div
						key={item?.id}
						className="col-6 col-md-4 col-lg-3 d-flex align-items-end mt-3"
					>
						<div className="dashboard-item text-center">
							<Link to={`/admin/${item?.url}`}>
								<img
									className="m-auto"
									alt=""
									src={`${process.env.PUBLIC_URL}/img/${item?.image}`}
								/>
								<h5 className="mt-3">{item?.name}</h5>
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Dashboard;
