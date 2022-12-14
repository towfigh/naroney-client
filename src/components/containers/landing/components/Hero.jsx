import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<div className="hero d-flex justify-content-center align-items-center">
			<div className="container">
				<h1 className="hero_title">نارُنِی</h1>
				<h6 className="hero_subtitle mx-auto">
					اگر لباسی که میپوشی برات مهمه پس قطعا جات همینجاست
				</h6>
				<div className="hero_btn mx-auto">
					<button type="button" className="nn_btn_primary mt-4">
						<Link to="/products/0">نمایش محصولات</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
