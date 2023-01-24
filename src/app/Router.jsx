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
import AddProduct from '../components/containers/admin/products/AddProduct';
import EditProduct from '../components/containers/admin/products/EditProduct';
import Loader from '../components/layouts/Loader';
import Messages from '../components/containers/admin/messages/Messages';
import ShowMessage from '../components/containers/admin/messages/ShowMessage';
import ContactUs from '../components/containers/contactUs/contactUs';

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
			<Loader />

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
					<Route path="/contact-us" element={<ContactUs />} />
					<Route path="/products/:cat" element={<Products />} />
					<Route path="/product/:code" element={<Product />} />
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
					<Route path="/admin/products" element={<Outlet />}>
						<Route path="/admin/products" element={<ProductsAdmin />} />
						<Route path="/admin/products/add" element={<AddProduct />} />
						<Route path="/admin/products/edit/:id" element={<EditProduct />} />
					</Route>
					<Route path="/admin/colors" element={<Colors />} />
					<Route path="/admin/sizes" element={<Sizes />} />
					<Route path="/admin/profile" element={<Profile />} />
					<Route path="/admin/messages" element={<Outlet />}>
						<Route path="/admin/messages" element={<Messages />} />
						<Route path="/admin/messages/:id" element={<ShowMessage />} />
					</Route>
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
