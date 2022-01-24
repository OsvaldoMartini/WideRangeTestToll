import React from 'react'
import { Card, Row, Col, Form, FloatingLabel } from 'react-bootstrap';

import subject from '../data/subject.json';

export const Subject3 = () => {
	const fullName = subject.title + " " + subject.forename + " " + subject.surname;
	return (
		<Card className="mb-2">

			<Card.Body>
				<Card.Title>Subject 3</Card.Title>
				<Row>
					<Col>
						<FloatingLabel controlId="floatingTextarea" label="NHS Number">
							<Form.Control readOnly defaultValue={subject.nhsNumber} />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId="floatingTextarea" label="Name">
							<Form.Control readOnly defaultValue={fullName} />
						</FloatingLabel>
					</Col>
				</Row>
				<Row>
					<Col>
						<FloatingLabel controlId="floatingTextarea" label="Gender">
							<Form.Control readOnly defaultValue={subject.gender} />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId="floatingTextarea" label="Date of birth">
							<Form.Control readOnly defaultValue={subject.dateOfBirth} />
						</FloatingLabel>
					</Col>
				</Row>
				<FloatingLabel controlId="floatingTextarea" label="Address">
					<Form.Control readOnly defaultValue={subject.address.addressLine1} />
				</FloatingLabel>
			</Card.Body>
		</Card>
	)
}

export default Subject3;
