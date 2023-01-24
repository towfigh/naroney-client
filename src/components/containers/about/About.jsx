import React from 'react';
import { connect } from 'react-redux';
import Header from '../../shared/Header';

const About = ({ contact }) => {
	return (
		<>
			<Header />
			<div className="container text-center">
				<div className="display-4 fw-bold py-5">درباره ما</div>
				<div className="fs-5 pb-5">
					{contact?.find((c) => c.id === '9')?.value}
				</div>
				<div className="row m-0">
					<div className="col-12 col-sm-6">
						<img
							className="w-100 mt-3"
							src={`${process.env.PUBLIC_URL}/img/a1.png`}
							alt=""
						/>
					</div>
					<div className="col-12 col-sm-6">
						<img
							className="w-100 mt-3"
							src={`${process.env.PUBLIC_URL}/img/a2.png`}
							alt=""
						/>
					</div>
				</div>
				<div className="fs-5 py-5">
					{contact?.find((c) => c.id === '10')?.value}
				</div>
				<div className="row pb-5 m-0">
					<div className="col-12 col-sm-6">
						<img
							className="w-100 mt-3"
							src={`${process.env.PUBLIC_URL}/img/a3.png`}
							alt=""
						/>
					</div>
					<div className="col-12 col-sm-6">
						<img
							className="w-100 mt-3"
							src={`${process.env.PUBLIC_URL}/img/a4.png`}
							alt=""
						/>
					</div>
				</div>
			</div>
		</>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		contact: main?.contact,
	};
}

export default connect(mapStateToProps)(About);
