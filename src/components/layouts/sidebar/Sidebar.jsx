import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { setAdmin } from '../../../redux/actions/adminActions';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { GiLargeDress } from 'react-icons/gi';
import { TfiRulerAlt } from 'react-icons/tfi';
import {
	MdOutlineContactPhone,
	MdOutlineCategory,
	MdOutlineSpaceDashboard,
	MdColorLens,
	MdOutlineMessage,
} from 'react-icons/md';

const Sidebar = ({ user, show, messages }) => {
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
			<h5 className="text-center pt-5 pb-1 mt-2">
				{' '}
				{user?.username} عزیز خوش آمدید{' '}
			</h5>
			<ul className="ps-2">
				<li className="py-2 fw-bold">
					<Link to="/admin">
						<MdOutlineSpaceDashboard size={20} className="ms-3" />
						داشبورد
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/messages">
						<MdOutlineMessage size={20} className="ms-3" />
						پیام ها
						{messages?.filter((m) => m.seen_at === null)?.length > 0 ? (
							<span className="unread_sidebar bg-light rounded-circle me-1 text-center d-inline-block">
								{' '}
								{messages?.filter((m) => m.seen_at === null)?.length}
							</span>
						) : (
							''
						)}
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/products">
						<GiLargeDress size={20} className="ms-3" />
						محصولات
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/categories">
						<MdOutlineCategory size={20} className="ms-3" />
						دسته بندی ها
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/colors">
						<MdColorLens size={20} className="ms-3" />
						رنگ ها
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/sizes">
						<TfiRulerAlt size={20} className="ms-3" />
						سایز ها
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/editcontact">
						<MdOutlineContactPhone size={20} className="ms-3" />
						ویرایش اطلاعات سایت
					</Link>
				</li>
				<li className="py-2 fw-bold">
					<Link to="/admin/profile">
						<CgProfile size={20} className="ms-3" />
						حساب کاربری
					</Link>
				</li>
				<li className="py-2">
					<button
						onClick={handleLogOut}
						className="bg-transparent border-0 fw-bold p-0"
					>
						<CgLogOut size={20} className="ms-3" />
						خروج
					</button>
				</li>
			</ul>
		</div>
	);
};

function mapStateToProps(state) {
	const { admin, main } = state;
	return { user: admin?.user, messages: main?.messages };
}

export default connect(mapStateToProps)(Sidebar);
