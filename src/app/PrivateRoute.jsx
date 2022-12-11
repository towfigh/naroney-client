import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ user }) => {
	return user ? <Outlet /> : <Navigate to="/nnlogin" />;
};

function mapStateToProps(state) {
	const { admin } = state;
	return { user: admin?.user };
}

export default connect(mapStateToProps)(PrivateRoutes);
