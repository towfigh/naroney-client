import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ expand }) => {
	const location = useLocation();
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
					if (window.scrollY > 355) {
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
						<NavDropdown.Item href="#action/3.1">- لباس عروس</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">- لباس شب</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">
							- لباس فرمالیته
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.4">- سایز بزرگ</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link className="nav-link" href="/">
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

export default Navigation;
