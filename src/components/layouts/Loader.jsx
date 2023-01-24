import React from 'react';
import { connect } from 'react-redux';

const Loader = ({ isLoading }) => {
	return (
		<>
			{isLoading ? (
				<div className="loader-container">
					<div className="loader inner" />
					<div className="loader middle" />
					<div className="loader outer" />
					<img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="NARONEY" />
				</div>
			) : (
				''
			)}
		</>
	);
};

function mapStateToProps(state) {
	const { loader } = state;
	return {
		isLoading: loader?.isLoading,
	};
}

export default connect(mapStateToProps)(Loader);
