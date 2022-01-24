import React, { useState, useEffect } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap';
import { ReactComponent as LoadingIcon } from "bootstrap-icons/icons/arrow-repeat.svg"
import axios from "axios";
import endpoint from '../config/endpoints';

const User = () => {
	const [isLoading, setLoading] = useState(true);
	const [user, setUser] = useState({ userName: ""});
	
	useEffect(() => {
		isLoading && axios.get(
			endpoint.USER_API_URL
		).then(
			(response) => {
				setUser({userName:response.data.userCode});
				setLoading(false);
			}
		).catch(
			(error) => {
				setUser({userName:"API Unreachable"})
				setLoading(false);
			}
		);

	}, [isLoading]);

	if(isLoading) {
		return (
			<>
				<Nav.Link>
					<LoadingIcon className="ma svg-rotate"/>
				</Nav.Link>
			</>
		)
	}

	if(!user.userName) {
		return (<>
			<Nav.Link>
				Not Logged In
			</Nav.Link>
		</>)
	}

	return (
		<>
			<NavDropdown title={user.userName} align="end" id="basic-nav-dropdown">
			<NavDropdown.Item href="#">Account</NavDropdown.Item>
			<NavDropdown.Item href="#">Change Org</NavDropdown.Item>
			<NavDropdown.Item href="#">Change Role</NavDropdown.Item>
			<NavDropdown.Item href="#">Logout</NavDropdown.Item>
			</NavDropdown>
		</>
	);
}

export default User;