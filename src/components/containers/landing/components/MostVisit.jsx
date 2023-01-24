import React from 'react';
import { connect } from 'react-redux';
import Slider from '../../../shared/Slider';

const MostVisit = ({ products }) => {
	return (
		<div className="most_visit">
			<h1 className="middle-title_lg text-center fw-bolder mx-auto py-3 my-5">
				پربازدیدترین محصولات
			</h1>
			{products && (
				<Slider
					data={products?.sort((a, b) => b.visit_count - a.visit_count)}
				/>
			)}
		</div>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		products: main?.products,
	};
}

export default connect(mapStateToProps)(MostVisit);
