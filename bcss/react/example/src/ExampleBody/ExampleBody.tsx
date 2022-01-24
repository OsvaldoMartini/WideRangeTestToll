import React from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap';
import { DateOfBirthAndAge } from "@bcss/react-components"
import Address from "../components/Address/Address";

import subject from '../data/subject.json';

export const ExampleBody = () => {
	const fullName = subject.title + " " + subject.forename + " " + subject.surname;
	return (
		<Card className="mb-2">

			<Card.Body>
				<Card.Title>Example 1</Card.Title>
				<Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>
                NHS Number
              </Form.Label>
              <Form.Control plaintext readOnly defaultValue={subject.nhsNumber} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Name
              </Form.Label>
              <Form.Control plaintext readOnly defaultValue={fullName} />
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col}>
              <Form.Label>
                Gender
              </Form.Label>
              <Form.Control plaintext readOnly defaultValue={subject.gender} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Date of birth
              </Form.Label>
              <p><DateOfBirthAndAge dateOfBirth={subject.dateOfBirth} /></p>
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} md={12}>
              <Form.Label>
                Address
              </Form.Label>
              <p>
                <Address address={subject.address} />
              </p>
            </Form.Group>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default ExampleBody;
