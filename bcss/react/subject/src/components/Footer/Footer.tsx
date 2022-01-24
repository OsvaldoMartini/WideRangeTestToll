import { Container, Navbar } from "react-bootstrap";

export const Footer = () => {
	return (
		<>

			<Navbar className="align-content-middle footer" as="footer">
				<Container >
					<p>Footer</p>
				</Container>
			</Navbar>
		</>
	)
}

export default Footer;