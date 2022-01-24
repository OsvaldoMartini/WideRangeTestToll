import React from 'react'
import { Container, Button } from 'react-bootstrap';
import Subject from "../Subject/Subject";
import Subject2 from "../Subject/Subject2";
import Subject3 from "../Subject/Subject3";
import Subject4 from "../Subject/Subject4";
import Note from "../components/Note/Note";
import Note2 from "../components/Note/Note2";
import Note3 from "../components/Note/Note3";

import { Row , Col } from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';

export const SubjectRedirect = () => {

  let [searchParams] = useSearchParams();
  let version = searchParams.get("version");
  
  let subject;
  let note;
  switch(version) {
    case "2" : 
      subject = <Subject2 />;
      note = <Note2 />
      break;
    case "3" : 
      subject = <Subject3 />;
      note = <Note3 />
      break;
    case "4" :
      subject = <Subject4 />;
      note = <Note3 />
      break;
    default:
      subject = <Subject />
      note = <Note />
      break;
  }

    return (
        <Container>
          <h1>Send a Kit</h1>
          {subject}
          {note}
          <Row>
            <Col className="d-flex justify-content-end" >
              <Button className="mt-2 me-3">Send Kit</Button>
            </Col>
          </Row>
        </Container>
    )
  }
