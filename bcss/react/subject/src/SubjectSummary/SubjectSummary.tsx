import React from 'react'

import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Subject from "../Subject/Subject";

export const SubjectSummary = () => {
    return (
        <Container>
          <h1>Subject Summary</h1>
		     <Subject />
         <p>This page is not yet available for normal use</p>
         <Link to="./redirect">Redirect</Link>
        </Container>
    )
  }
