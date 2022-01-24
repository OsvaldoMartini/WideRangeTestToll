import { Container, Navbar } from "react-bootstrap";

export const Footer = () => {
	return (
		<>

			<Navbar className="align-content-middle footer" as="footer">
				<Container >
					<a href="#">Site Map</a>
				</Container>
			</Navbar>
		</>
	)
}

export default Footer;