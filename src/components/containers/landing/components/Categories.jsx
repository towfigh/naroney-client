import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
	return (
		<div className="categories container my-5">
			<div className="row m-0">
				<div className="col-12 col-sm-6 col-lg-3">
					<Link to="/about">
						<div className="category_item text-center position-relative">
							<div className="img_holder position-relative m-0">
								<div className="img_div">
									<img alt="" src={`${process.env.PUBLIC_URL}/img/c4.jpg`} />
									<img alt="" src={`${process.env.PUBLIC_URL}/img/c4.jpg`} />
								</div>
							</div>
							<h3 className="position-absolute w-100">سایز بزرگ</h3>
						</div>
					</Link>
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<Link to="/about">
						<div className="category_item text-center position-relative">
							<div className="img_holder position-relative m-0">
								<div className="img_div">
									<img alt="" src={`${process.env.PUBLIC_URL}/img/c3.jpg`} />
								</div>
							</div>
							<h3 className="position-absolute w-100">مجلسی</h3>
						</div>
					</Link>
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<Link to="/about">
						<div className="category_item text-center position-relative">
							<div className="img_holder position-relative m-0">
								<div className="img_div">
									<img alt="" src={`${process.env.PUBLIC_URL}/img/c2.png`} />
								</div>
							</div>
							<h3 className="position-absolute w-100">فرمالیته</h3>
						</div>
					</Link>
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<Link to="/about">
						<div className="category_item text-center position-relative">
							<div className="img_holder position-relative m-0">
								<div className="img_div">
									<img alt="" src={`${process.env.PUBLIC_URL}/img/c1.png`} />
								</div>
							</div>
							<h3 className="position-absolute w-100">لباس شب</h3>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Categories;
