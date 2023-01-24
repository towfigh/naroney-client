import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesUrl } from '../../../../app/Rules';

const Categories = ({ categories }) => {
	return (
		<div className="categories container my-5">
			<div className="row m-0">
				{categories?.map((item) => (
					<div className="col-12 col-sm-6 col-lg-3 m-auto" key={item?.id}>
						<Link to={`/products/${item?.id}`}>
							<div className="category_item text-center position-relative">
								<div className="img_holder position-relative m-0">
									<div className="img_div">
										<img alt="" src={`${categoriesUrl}/${item?.image}.jpg`} />
									</div>
								</div>
								<h3 className="position-absolute w-100 py-2">{item?.name} </h3>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		categories: main?.categories,
	};
}

export default connect(mapStateToProps)(Categories);
