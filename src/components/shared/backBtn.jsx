import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router';

const BackBtn = () => {
	const navigate = useNavigate();
	return (
		<div className="back_btn text-start">
			<button
				onClick={() => navigate(-1)}
				className="bg-transparent border-0 text-dark"
			>
				<BiArrowBack size={20} />
			</button>
		</div>
	);
};

export default BackBtn;
