import React from 'react'
import { Card, Form, FloatingLabel } from 'react-bootstrap';

export const Note3 = () => {
	return (
		<>
			<Card className="mb-2">
				
				<Card.Body>
					<Card.Title>Note 3</Card.Title>
				
					<FloatingLabel
						controlId="floatingInput"
						label="Title"
						className="mb-3"
					>
						<Form.Control type="text" placeholder="Title" />
					</FloatingLabel>
					<FloatingLabel controlId="floatingTextarea" label="Text" className="mb-3">
						<Form.Control as="textarea" placeholder="Enter note here" />
					</FloatingLabel>
				</Card.Body>
			</Card>
		</>
	)
}
export default Note3;