import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from '../components/layouts/footer/Footer';
import Navigation from '../components/layouts/navigation/Navigation';
import Landing from '../components/containers/landing/Landing';
import About from '../components/containers/about/About';
import Product from '../components/containers/product/Product';
import Products from '../components/containers/products/Products';
import NotFound from '../components/containers/not-found/NotFound';
import PrivateRoutes from './PrivateRoute';
import Login from '../components/containers/login/Login';

const Router = () => {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				className="toast_in_dashboard"
				draggablePercent={40}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Navigation />
							<main>
								<div>
									<Outlet />
								</div>
							</main>
							<Footer />
						</>
					}
				>
					<Route exact path="/" element={<Landing />} />
					<Route path="/about" element={<About />} />
					<Route path="/products/:cat" element={<Products />} />
					<Route path="/product/:id" element={<Product />} />
				</Route>
				<Route path="/nnlogin" element={<Login />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/admin" element={<h1>admin</h1>} />
				</Route>
				<Route
					path="*"
					element={
						<>
							<Navigation />
							<main>
								<div>
									<NotFound />
								</div>
							</main>
							<Footer />
						</>
					}
				/>
			</Routes>
		</>
	);
};

export default Router;
