import React from 'react'
import { Card, Form, Col, Row, FormControl } from 'react-bootstrap';

export const Note2 = () => {
	return (
		<>
			<Card className="mb-2">
				<Card.Body>
				<Card.Title>Note 2</Card.Title>
					<Form>
						<Form.Group className="mb-3" as={Row}>
							<Form.Label column sm={2}>
								Title
							</Form.Label>
							<Col>
								<Form.Control type="text" placeholder="Title" />
							</Col>
						</Form.Group>
						<Form.Group className="mb-3" as={Row}>
							<Form.Label column sm={2}>
								Text
							</Form.Label>
							<Col>
								<FormControl as="textarea" aria-label="Note text" placeholder="Text (500 characters)" maxLength={500} />
							</Col>
						</Form.Group>
					</Form>

				</Card.Body>
			</Card>
		</>
	)
}
export default Note2;