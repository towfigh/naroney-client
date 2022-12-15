import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { setAdmin } from '../../../redux/actions/adminActions';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { GiLargeDress } from 'react-icons/gi';
import {
	MdOutlineContactPhone,
	MdOutlineCategory,
	MdOutlineSpaceDashboard,
} from 'react-icons/md';

const Sidebar = ({ user, show }) => {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(setAdmin(null));
		redirect('/admin');
	};

	return (
		<div
			className={
				show
					? 'sidebar position-fixed p-2 p-md-2 show'
					: 'sidebar position-fixed p-0 p-md-2'
			}
		>
			<h5 className="text-center pt-5 pb-3 mt-5">
				{' '}
				{user?.username} عزیز خوش آمدید{' '}
			</h5>
			<ul className="p-3">
				<li className="py-3 fw-bold">
					<Link to="/admin">
						<MdOutlineSpaceDashboard size={20} className="ms-3" />
						داشبورد
					</Link>
				</li>
				<li className="py-3 fw-bold">
					<Link to="/admin/profile">
						<CgProfile size={20} className="ms-3" />
						حساب کاربری
					</Link>
				</li>
				<li className="py-3 fw-bold">
					<Link to="/admin/products">
						<GiLargeDress size={20} className="ms-3" />
						محصولات
					</Link>
				</li>
				<li className="py-3 fw-bold">
					<Link to="/admin/categories">
						<MdOutlineCategory size={20} className="ms-3" />
						دسته بندی ها
					</Link>
				</li>
				<li className="py-3 fw-bold">
					<Link to="/admin/editcontact">
						<MdOutlineContactPhone size={20} className="ms-3" />
						ویرایش اطلاعات تماس
					</Link>
				</li>
				<li className="py-3">
					{/* <Link to="/admin/editcontact"> */}
					<button
						onClick={handleLogOut}
						className="bg-transparent border-0 fw-bold p-0"
					>
						<CgLogOut size={20} className="ms-3" />
						خروج
					</button>
					{/* </Link> */}
				</li>
			</ul>
		</div>
	);
};

function mapStateToProps(state) {
	const { admin } = state;
	return { user: admin?.user };
}

export default connect(mapStateToProps)(Sidebar);
