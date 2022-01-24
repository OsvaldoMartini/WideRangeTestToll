import React, { useState, useEffect } from 'react'
import { ReactComponent as ReactLogo } from '../logo.svg';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { ReactComponent as HelpIcon } from "bootstrap-icons/icons/question-circle-fill.svg"
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

export const Header = () => {
	const [user, setUser] = useState({ userName: "BCS01" }); //NOSONAR

	useEffect(() => {
		console.log(user.userName);
	});

	return (
		<>
			<header className='bg-white'>
				<Navbar bg="primary" variant="dark">
					<Container>
						<Navbar.Brand href="/" className="me-auto">
							<ReactLogo className="pe-2" />
							Bowel Cancer Screening System
						</Navbar.Brand>
						<Nav className="justify-content-end">
							<Nav.Link href="/example/">
								<HelpIcon />
							</Nav.Link>
							<NavDropdown title={user.userName} align="end" id="basic-nav-dropdown">
								<NavDropdown.Item href="#">Account</NavDropdown.Item>
								<NavDropdown.Item href="#">Change Org</NavDropdown.Item>
								<NavDropdown.Item href="#">Change Role</NavDropdown.Item>
								<NavDropdown.Item href="#">Logout</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Container>
				</Navbar>
				<Breadcrumb />
			</header>
		</>
	)
}
