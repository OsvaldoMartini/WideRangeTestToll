import { Breadcrumb as BSBreadcrumb, Container} from 'react-bootstrap';

export const Breadcrumb = () => {
	return (
	<Container className="pt-1 pb-1">
		<BSBreadcrumb>
			<BSBreadcrumb.Item href="#">Home</BSBreadcrumb.Item>
			<BSBreadcrumb.Item href="/subject">
				Subject
			</BSBreadcrumb.Item>
		</BSBreadcrumb>
	</Container>
	)
}

export default Breadcrumb;