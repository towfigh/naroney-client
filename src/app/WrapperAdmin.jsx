import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Sidebar from '../components/layouts/sidebar/Sidebar';

const WrapperAdmin = ({ children }) => {
	const [show, setShow] = useState(false);
	const location = useLocation();
	useEffect(() => {
		setShow(false);
	}, [location]);
	return (
		<>
			<Sidebar show={show} />
			<div className="hambur position-fixed d-md-none">
				<button
					onClick={() => setShow((pre) => !pre)}
					className="hambur_btn bg-transparent border-0"
				>
					<img alt="" src={`${process.env.PUBLIC_URL}/img/ham.png`} />
				</button>
			</div>
			<div className="admin_layout p-3 mt-4 mt-lg-0 pt-5 p-lg-5">
				<div>{children}</div>
			</div>
		</>
	);
};

export default WrapperAdmin;
