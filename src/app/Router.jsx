import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Landing from '../components/containers/landing/Landing';
import About from '../components/containers/about/About';
import Product from '../components/containers/product/Product';
import Products from '../components/containers/products/Products';
import NotFound from '../components/containers/not-found/NotFound';
import PrivateRoutes from './PrivateRoute';
import Login from '../components/containers/login/Login';
import Wrapper from './Wrapper';
import Dashboard from '../components/containers/admin/dashboard/Dashboard';
import EditContact from '../components/containers/admin/editContact/EditContact';
import Categories from '../components/containers/admin/categories/Categories';
import Profile from '../components/containers/admin/profile/Profile';
import ProductsAdmin from '../components/containers/admin/products/ProductsAdmin';
import { ToastContainer } from 'react-toastify';
import AddCategory from '../components/containers/admin/categories/AddCategory';
import EditCategory from '../components/containers/admin/categories/EditCategory';
import Colors from '../components/containers/admin/colors/Colors';
import Sizes from '../components/containers/admin/sizes/Sizes';

const Router = () => {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={true}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				draggablePercent={40}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Wrapper>
							<Outlet />
						</Wrapper>
					}
				>
					<Route exact path="/" element={<Landing />} />
					<Route path="/about" element={<About />} />
					<Route path="/products/:cat" element={<Products />} />
					<Route path="/product/:id" element={<Product />} />
				</Route>
				<Route path="/nnlogin" element={<Login />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/admin" element={<Dashboard />} />
					<Route path="/admin/editcontact" element={<EditContact />} />
					<Route path="/admin/categories" element={<Outlet />}>
						<Route path="/admin/categories" element={<Categories />} />
						<Route path="/admin/categories/add" element={<AddCategory />} />
						<Route
							path="/admin/categories/edit/:id"
							element={<EditCategory />}
						/>
					</Route>
					<Route path="/admin/colors" element={<Colors />} />
					<Route path="/admin/sizes" element={<Sizes />} />
					<Route path="/admin/profile" element={<Profile />} />
					<Route path="/admin/products" element={<ProductsAdmin />} />
				</Route>
				<Route
					path="*"
					element={
						<Wrapper>
							<NotFound />
						</Wrapper>
					}
				/>
			</Routes>
		</>
	);
};

export default Router;
