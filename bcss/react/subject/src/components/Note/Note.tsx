import React from 'react'
import { Card, Form, FormControl } from 'react-bootstrap';

export const Note = () => {
	return (
		<>
			<Card className="mb-2">
				<Card.Body>
				<Card.Title>Note 1</Card.Title>
					<Form>
						<Form.Group className="mb-3" >
							<Form.Label>
								Title
							</Form.Label>
								<Form.Control type="text" placeholder="Title" />
						</Form.Group>
						<Form.Group className="mb-3" >
							<Form.Label>
								Text
							</Form.Label>
								<FormControl as="textarea" aria-label="Note text" placeholder="Text (500 characters)" maxLength={500} />
						</Form.Group>
					</Form>

				</Card.Body>
			</Card>
		</>
	)
}
export default Note;