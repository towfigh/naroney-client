import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import WrapperAdmin from './WrapperAdmin';

const PrivateRoutes = ({ user }) => {
	return user ? (
		<>
			<WrapperAdmin>
				<Outlet />
			</WrapperAdmin>
		</>
	) : (
		<Navigate to="/nnlogin" />
	);
};

function mapStateToProps(state) {
	const { admin } = state;
	return { user: admin?.user };
}

export default connect(mapStateToProps)(PrivateRoutes);
