import React from 'react'
import { Col, Form, Row, Popover, OverlayTrigger, Button, Card } from 'react-bootstrap';
import DateOfBirthAndAge from "../components/DateOfBirthAndAge/DateOfBirthAndAge"
import Address from "../components/Address/Address";

import subject from '../data/subject.json';

export const Subject4 = () => {
	const fullName = subject.title + " " + subject.forename + " " + subject.surname;

	return (
		<Card className="mb-2"> 

			<Card.Body>
			<Row md="auto">
				<Col>
					<Form.Group as={Row} md="auto">
						<Form.Label column>
							NHS Number
						</Form.Label>
						<Col>
							<Form.Control type="text" plaintext readOnly defaultValue={subject.nhsNumber} />
						</Col>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group as={Row} md="auto">
						<Form.Label column>
							Subject
						</Form.Label>
						<Col>
							<OverlayTrigger key={subject.id} trigger="hover" placement="bottom" overlay={
								<Popover id="popover-basic">
									<Popover.Header as="h3">Subject Details:</Popover.Header>
									<Popover.Body>
										<strong>Address</strong>
										<br />
										<Address address={subject.address} />
									</Popover.Body>
								</Popover>
							}>
								<Button variant="link" className='dropdown-toggle'>
									{fullName}
								</Button>
							</OverlayTrigger>
						</Col>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group as={Row} md="auto">
						<Form.Label column>
							Gender
						</Form.Label>
						<Col>
							<Form.Control type="text" plaintext readOnly defaultValue={subject.gender} />
						</Col>
					</Form.Group>
				</Col>
				<Col>
					<DateOfBirthAndAge dateOfBirth={subject.dateOfBirth} />
				</Col>

			</Row>
			</Card.Body>
			</Card>
	)
}

export default Subject4;
