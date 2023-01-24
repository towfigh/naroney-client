import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllFeed } from '../../../redux/actions/mainActions';

const Navigation = ({ categories }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [backColor, setBackColor] = useState('#00000000');
	const [backPadding, setBackPadding] = useState('0.5rem');
	const [backPosition, setBackPosition] = useState('absolute');

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		if (window.innerWidth < 576) {
			setBackPosition('fixed');
			window.addEventListener('scroll', () => {
				if (location.pathname === '/') {
					if (window.scrollY > window.innerHeight - 100) {
						setBackColor('#000');
						setBackPadding('0');
					} else {
						setBackColor('#00000000');
						setBackPadding('0.5rem');
					}
				} else {
					if (window.scrollY > 270) {
						setBackColor('#000');
						setBackPadding('0');
					} else {
						setBackColor('#00000000');
						setBackPadding('0.5rem');
					}
				}
			});
		} else {
			setBackPosition('absolute');
		}
	}, [location]);

	useEffect(() => {
		dispatch(getAllFeed());
		// eslint-disable-next-line
	}, []);
	return (
		<Navbar
			expand="sm"
			collapseOnSelect
			className="navbar-dark text-light"
			style={{
				backgroundColor: backColor,
				padding: backPadding,
				position: backPosition,
			}}
		>
			<Navbar.Brand>
				<Link className="nav-link" to="/">
					<img
						alt=""
						className="logo"
						src={`${process.env.PUBLIC_URL}/img/logo.png`}
					/>
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="d-flex justify-content-around">
					<Nav.Link className="nav-link" href="/">
						<Link to="/">خانه</Link>
					</Nav.Link>
					<NavDropdown title="محصولات" id="basic-nav-dropdown">
						<NavDropdown.Item href="/products/0">
							- تمام محصولات
						</NavDropdown.Item>
						{categories?.map((item) => (
							<NavDropdown.Item href={`/products/${item?.id}`} key={item?.id}>
								- {item?.name}
							</NavDropdown.Item>
						))}
					</NavDropdown>
					<Nav.Link className="nav-link" href="/contact-us">
						تماس با ما
					</Nav.Link>
					<Nav.Link className="nav-link" href="/about">
						<Link to="/about">درباره ما</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

function mapStateToProps(state) {
	const { main } = state;
	return {
		categories: main?.categories,
	};
}

export default connect(mapStateToProps)(Navigation);
