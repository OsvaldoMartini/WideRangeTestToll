import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IMarca } from '../../../app/models/marca';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from '../../../';

const marcaImageStyle = {
  filter: 'brightness(30%)'
};

const marcaImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const MarcaDetailedHeader: React.FC<{ marca: IMarca }> = ({
  marca
}) => {
  const host = marca.attendees.filter(x => x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const { attendMarca, cancelAttendance, loading } = rootStore.marcaStore;
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${marca.category}.jpg`}
          fluid
          style={marcaImageStyle}
        />
        <Segment style={marcaImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={marca.title}
                  style={{ color: 'white' }}
                />
                <p>{format(marca.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/profile/${host.username}`}>
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {marca.isHost ? (
          <Button
            as={Link}
            to={`/manageMarca/${marca.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        ) : marca.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendMarca} color='teal'>
            Join Marca
          </Button>
        )}
        <Button
          onClick={
            marca.id
              ? () => history.push('/marcas')
              :() => history.push(`/marcas/${marca.id}`)
          }
          disabled={loading}
          floated='right'
          type='button'
          content='Retornar'
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(MarcaDetailedHeader);
