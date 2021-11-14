import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';

const HomePage = () => {


  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Martini Marcas
        </Header>
        <Fragment>
          <Header as='h2' inverted content={`Welcome NHS Digital`} />
        </Fragment>
      </Container>
    </Segment>
  );
};

export default HomePage;
