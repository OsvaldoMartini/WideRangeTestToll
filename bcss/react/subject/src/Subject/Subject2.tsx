import React from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap';
import DateOfBirthAndAge from "../components/DateOfBirthAndAge/DateOfBirthAndAge"
import Address from "../components/Address/Address";

import subject from '../data/subject.json';

export const Subject2 = () => {
	const fullName = subject.title + " " + subject.forename + " " + subject.surname;
	return (
		<Card className="mb-2">
			
				<Card.Body>
				<Card.Title>Subject 2</Card.Title>
		<Form as={Row}>
			<Form.Group as={Col} md={6}>
				<Row>
					<Form.Label column md={4}>
						NHS Number
					</Form.Label>
					<Col md={8}>
						<Form.Control plaintext readOnly defaultValue={subject.nhsNumber} />
					</Col>
				</Row>
			</Form.Group>
			<Form.Group  as={Col} md={6}>
				<Row>
				<Form.Label column md={4}>
					Name
				</Form.Label>
				<Col>
				<Form.Control plaintext readOnly defaultValue={fullName} />
				</Col>
				</Row>
			</Form.Group>
			<Form.Group as={Col} md={6}>
				<Row>
				<Form.Label column md={4}>
					Gender
				</Form.Label>
				<Col>
				<Form.Control plaintext readOnly defaultValue={subject.gender} />
				</Col>
				</Row>
			</Form.Group>
			<Form.Group as={Col} md={6}>
				<Row>
				<Form.Label column md={4}>
					Date of birth
				</Form.Label>
				<Col>
				<DateOfBirthAndAge dateOfBirth={subject.dateOfBirth} />
				</Col>
				</Row>
			</Form.Group>
			<Form.Group as={Col} md={12}>
				<Row>
				<Form.Label column md={2}>
					Address
				</Form.Label>
				<Col>
				<Address address={subject.address} />
				</Col>
				</Row>
			</Form.Group>
		</Form>
		</Card.Body>
		</Card>
	)
}

export default Subject2;
