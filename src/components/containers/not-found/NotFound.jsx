import React from 'react';
import Header from '../../shared/Header';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<>
			<Header />
			<div className="container">
				<h1 className="middle-title_lg text-center fw-bolder mx-auto py-3 my-4">
					صفحه مورد نظر پیدا نشد
				</h1>
			</div>

			<div className="text-center py-5">
				<button className="nn_btn_primary">
					<Link to="/">بازگشت به صفحه اصلی</Link>
				</button>
			</div>
		</>
	);
};

export default NotFound;
