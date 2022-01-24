import React from 'react'
import { ReactComponent as ReactLogo } from '../logo.svg';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ReactComponent as HelpIcon } from "bootstrap-icons/icons/question-circle-fill.svg"
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import User from "./User"

const Header = () => {
	return (
		<>
			<header data-testid="header" className='bg-white'>
				<Navbar bg="primary" variant="dark">
					<Container>
						<Navbar.Brand href="/" className="me-auto">
							<ReactLogo className="pe-2" />
							Bowel Cancer Screening System
						</Navbar.Brand>
						<Nav className="justify-content-end">
							<Nav.Link href="/subject/">
								<HelpIcon />
							</Nav.Link>
							<User />
						</Nav>
					</Container>
				</Navbar>
				<Breadcrumb />
			</header>
		</>
	)
}

export default Header;
